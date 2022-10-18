import {db, pgp} from '../../config/db.connection'
import {NewsInterface, TagsInterface, NewsParams} from '../interface/news.interface';
import * as RedisService from '../service/redis.service';

export const getNews = (params:NewsParams) => {
    const {topicId, status} = params;

    let where:string = '';

    if (topicId) {
        if (where.length == 0) {
            where += `where N.topic->>'topic_id' = $<topicId>`;
        } else {
            where += `and N.topic->>'topic_id' = $<topicId>`;
        }
    }

    if (status) {
        if (where.length == 0) {
            where += `where N.status = $<status>`;
        } else {
            where += `and N.status = $<status>`;
        }
    }

    return db.query(`
    with N as (
        select 
        n.news_id, n.name, n.body, n.status, n.created_on,
        n.updated_at,
        (
            select row_to_json(a) from (
                select t.topic_id, t.name
                from topics t
                where t.topic_id = n.topic_id
            ) a
        ) as topic,
        (
            select array_to_json(array_agg(a)) from (
                select tg.tag_id, tg.name
                from tags tg
                where tg.news_id = n.news_id
            ) a
        ) as tags
        from news n
    ) select N.*
    from N
    ${where}
    `,params)
}

export const getNewsById = async (newsId:number) => {
    return db.oneOrNone(`
    with N as (
        select 
        n.news_id, n.name, n.body, n.status, n.created_on,
        n.updated_at,
        (
            select row_to_json(a) from (
                select t.topic_id, t.name
                from topics t
                where t.topic_id = n.topic_id
            ) a
        ) as topic,
        (
            select array_to_json(array_agg(a)) from (
                select tg.tag_id, tg.name
                from tags tg
                where tg.news_id = n.news_id
            ) a
        ) as tags
        from news n
    ) select N.*
    from N
    where N.news_id = $1
    `,[newsId])
}

export const createNews = async(data:NewsInterface) => {
    const {name, body, status, topic_id, tags} = data
    let response = {} as NewsInterface
    await db.tx(async (trx) => {
        response = await trx.one(`INSERT INTO news (name,body,status,topic_id,created_on)
        VALUES
        ($1, $2, $3, $4, $5) RETURNING *
        `,[name, body, status, topic_id, new Date()])
        
        await updateOrDeleteTags(trx, 'create', tags, response.news_id!);
    })

    return response
}

export const updateNews = async(data:NewsInterface) => {
    const {news_id, name, body, status, topic_id, tags} = data
    let response = {} as NewsInterface

    await db.tx(async (trx) => {
        response = await trx.one(`UPDATE news
            SET name=$2, body=$3, status=$4, topic_id=$5,
            updated_at=$6
            where news_id=$1
            RETURNING * 
        `,[news_id, name, body, status, topic_id, new Date()]);

        //delete old tags
        await updateOrDeleteTags(trx, 'delete', tags, news_id!);

        //create new tags
        await updateOrDeleteTags(trx, 'create', tags, news_id!);
    })

    return response
}

export const deleteNews = async (newsId:string) => {
    return await db.tx(async (trx) => {
       trx.none(`DELETE from news n
       WHERE n.news_id = $1`,[parseInt(newsId)])
    })
}

const updateOrDeleteTags = (trx:any, type:string, data:string[], news_id: number) => {
    if (type === 'create') {
        const column = new pgp.helpers.ColumnSet(['name','news_id','created_on'],{table:'tags'})
        
        let values: TagsInterface[] = []

        data.map((data:string, i:number) => {
            values.push({
                name: data,
                news_id: news_id,
                created_on: new Date()
            })
        })

        const tagsQuery = pgp.helpers.insert(values, column)
        
        return trx.none(tagsQuery);
    } else if (type === 'delete') {
        return trx.none(`delete from tags where tags.news_id = $1`, [news_id])
    }
}

export const checkIfNewsInRedis = async (newsId:number|null) => {
    let newsInRedis = await RedisService.getDataFromRedis('news')

    if (!newsInRedis) {
        return null
    }

    if (newsId) {
        let news = JSON.parse(newsInRedis);
        news = news.find((data:NewsInterface) => data.news_id === newsId)

        if (news) return JSON.parse(news)

        return null
    }
   
    return JSON.parse(newsInRedis)
}

export const updatedNewsInRedis = async (newsId:number, data:any | null, action: string) => {
    return await RedisService.updateDataFromRedis('news', 
        newsId!, action, data
    )
}

module.exports = {
    getNews,
    createNews,
    updateNews,
    deleteNews,
    getNewsById,
    checkIfNewsInRedis,
    updatedNewsInRedis
}
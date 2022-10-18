import * as NewsRepository from '../repository/news.repository'
import * as RedisService from '../service/redis.service';
import { NewsInterface } from '../interface/news.interface';

export const getNews = async(req:any, reply: any) => {
    try {
        const newsInRedis = await NewsRepository.checkIfNewsInRedis(null)

        if (newsInRedis) {
            console.log('hit redis')
            return reply.success(newsInRedis, "success retrieve data")
        }

        const response = await NewsRepository.getNews(req.query)

        await RedisService.setDataToRedis(
            'news',
            JSON.stringify(response)
        )

        return reply.success(response, "success retrieve data")
    } catch (err: any) {
        return reply.error(err);
    }
}

export const getNewsById = async (req:any, reply:any) => {
    try {
        const newsInRedis = await NewsRepository.checkIfNewsInRedis(req.params.newsId)

        if (newsInRedis) {
            let news = newsInRedis;
            news = news.find((data: NewsInterface) => data.news_id === parseInt(req.params.newsId))
            if (news) return reply.success(news, "success retrieve data")
        }

        const response = await NewsRepository.getNewsById(req.params.newsId)

        if (response) {
            return reply.success(response, "success retrieve data")
        } else {
            return reply.error("news not found")
        }

    } catch (err: any) {
        return reply.error(err);
    }
}

export const postNews = async (req:any, reply: any) => {
    try {
        const response = await NewsRepository.createNews(req.body)
        if (response) {
            const insertedNews = await NewsRepository.getNewsById(response.news_id!)
            await NewsRepository.updatedNewsInRedis(response.news_id!, insertedNews, 'update')
        }
        return reply.success(response, "success insert data")
    } catch (err: any) {
        console.log(err)
        return reply.error(err.detail);
    }
}

export const updateNews = async (req:any, reply: any) => {
    try {
        let checkNews = await NewsRepository.checkIfNewsInRedis(req.body.newsId)

        if (!checkNews) {
            checkNews = await NewsRepository.getNewsById(req.body.newsId)
            if (!checkNews) {
                return reply.error("news not found");
            }
        }

        const response = await NewsRepository.updateNews(req.body)

        if (response) {
            const updatedNews = await NewsRepository.getNewsById(response.news_id!)
            await NewsRepository.updatedNewsInRedis(response.news_id!, updatedNews, 'update')
        } else {
            return reply.error("news not found");
        }

        return reply.success(response, "success update data")
    } catch (err: any) {
        return reply.error(err);
    }
}

export const deleteNews = async (req:any, reply:any) => {
    try {
        let checkNews = await NewsRepository.checkIfNewsInRedis(req.params.newsId)

        if (!checkNews) {
            checkNews = await NewsRepository.getNewsById(req.params.newsId)
            if (!checkNews) {
                return reply.error("news not found");
            }
        }

        await NewsRepository.deleteNews(req.params.newsId)
        await NewsRepository.updatedNewsInRedis(parseInt(req.params.newsId), null, 'delete')
        return reply.success(req.params.newsId, "success delete data")
    } catch (err: any) {
        return reply.error(err);
    }
}

module.exports = {
    getNews,
    postNews,
    updateNews,
    deleteNews,
    getNewsById
}
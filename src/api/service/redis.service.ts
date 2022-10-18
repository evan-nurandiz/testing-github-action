import {redis} from '../../config/redis.connection'
import {NewsInterface} from '../interface/news.interface'

export const setDataToRedis = (key:string,data:string) => {
    return redis.set(key, data)
}

export const getDataFromRedis = (key:any) => {
    return redis.get(key)
}

export const deleteDataFromRedis = (key:any) => {
    return redis.del(key)
}

export const updateDataFromRedis = async (
    key:string, id:number, action:string, data: any | null
) => {
    let storedData = await getDataFromRedis(key)

    if (storedData && id) {
        if (key === 'news') {
            let redisData = JSON.parse(storedData);
            if (action === 'delete') {
                console.log(id)
                redisData = redisData.filter((data:NewsInterface) => data.news_id !== id)
                console.log(redisData);
            } else if (action === 'update') {
                redisData = redisData.filter((data:NewsInterface) => data.news_id !== id)
                redisData.push(data)
            }
            return setDataToRedis(key, JSON.stringify(redisData))
        }
    }
}


module.exports = {
    setDataToRedis,
    getDataFromRedis,
    deleteDataFromRedis,
    updateDataFromRedis
}
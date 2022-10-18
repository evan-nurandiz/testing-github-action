import * as TopicRepository from '../repository/topic.repository'

export const postTopic = async (req: any, reply: any) => {
    const {name} = req.body

    try {
        const response = await TopicRepository.createTopic(name)
        return reply.success(response, "success insert data")
    } catch (err: any) {
        return reply.error(err.detail);
    }
}

module.exports = {
    postTopic
}
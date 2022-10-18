import * as TopicControllers from '../controllers/topic.controller'
import * as Validation from '../validation';

export const topicRoutes = async(server:any) => {
    server.post('/', {
        schema: {
            body: Validation.PostTopicBody
        },
        handler:TopicControllers.postTopic
    })
}

export default topicRoutes;
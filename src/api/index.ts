import * as TopicRoute from './routes/topic.route'
import * as NewsRoute from './routes/news.route'

export const routes = async(server:any) => {
    server.register(TopicRoute,{prefix: '/topic'})
    server.register(NewsRoute,{prefix: '/news'})
}

export default routes;

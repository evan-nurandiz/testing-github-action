import * as NewsController from '../controllers/news.controller'
import * as Validation from '../validation';

export const newsRoutes = async(server:any) => {
    server.get('/', {
        schema: {
            querystring: Validation.NewsQueryString
        },
        handler:NewsController.getNews
    }),
    server.get('/:newsId', {
        handler:NewsController.getNewsById
    }),
    server.post('/', {
        schema: {
            body: Validation.PostNewsBody
        },
        handler:NewsController.postNews
    }),
    server.patch('/update',{
        schema: {
            body: Validation.UpdateNewsBody
        },
        handler: NewsController.updateNews
    }),
    server.delete('/:newsId',{
        schema: {
            querystring: Validation.NewsQueryString
        },
        handler: NewsController.deleteNews
    })
}

export default newsRoutes;
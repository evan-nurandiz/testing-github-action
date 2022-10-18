import * as NewsRepository from '../api/repository/news.repository'


// testing does not insert data to redis
describe('news test',() => {
    xit('should get news', ()=> {
        const newsParams = {
            topicId: null,
            status: null,
        }

        return NewsRepository.getNews(newsParams).then((res) => {
            console.log(res)
        })
    }),
    it('should get news by id', () => {
        const news_id = 16;

        return NewsRepository.getNewsById(news_id).then((res) => {
            console.log(res)
        })
    }),
    xit('should create news', ()=> {
        const newsBody = {
            news_id: 7,
            name: "investasi bitcoin 99",
            body: "ini body semoga banyak",
            status: "draft",
            topic_id: 1,
            tags: ["Safe investment", "mutual fund", "funding"],
            created_on: new Date()
        }

        return NewsRepository.createNews(newsBody).then((res) => {
            console.log(res)
        })
    }),
    xit('should update news', ()=> {
        const updateBody = {
            news_id: 16,
            name: "investasi bitcoin 22",
            body: "ini body semoga banyak",
            status: "draft",
            topic_id: 1,
            tags: ["Safe investment", "mutual fund", "funding"],
            created_on: null
        }

        return NewsRepository.updateNews(updateBody).then((res) => {
            console.log(res)
        })
    }),
    xit('should delete news', ()=> {
        const newsId = 16;

        return NewsRepository.deleteNews(newsId.toString()).then(() => {
            console.log('success delete')
        })
    })
})
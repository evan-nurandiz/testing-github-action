export interface NewsInterface {
    news_id: null | number
    name: string
    body: string
    status: string
    topic_id: number
    tags: string[]
    created_on: null | Date
};

export interface TagsInterface {
    name:string,
    news_id:number,
    created_on: Date
}

export interface NewsParams {
    topicId:string | null,
    status:string | null,
};

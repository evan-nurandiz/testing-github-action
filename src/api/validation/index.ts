export const PostTopicBody = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 50 },
  },
  required: ['name']
}

export const NewsQueryString = {
  type: 'object',
  additionalProperties: true,
  properties: {
    topicId: {
      type: 'string'
    },
    newsId: {
      type: 'integer'
    }
  }
}

export const PostNewsBody = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 50 },
    body: { type: 'string', maxLength: 1500, },
    status: {type: 'string', enum: ['draft', 'deleted', 'publish']},
    topic_id: {type: 'integer'},
    tags: { "type": "array",
    "items": {
      "type": "string"
    }}
  },
  required: ['name', 'body', 'status', 'topic_id', 'tags']
}

export const UpdateNewsBody = {
  type: 'object',
  properties: {...PostNewsBody.properties,
    news_id: {type: 'integer'}
  },
  required: ['news_id','name', 'body', 'status', 'topic_id', 'tags']
}

module.exports = {
  PostTopicBody,
  PostNewsBody,
  UpdateNewsBody
}
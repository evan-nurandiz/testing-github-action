import {db} from '../../config/db.connection'
const schema = process.env.SCHEMA_NAME

export const createTopic = (name:string) => {
    return db.tx((trx) => {
        return trx.query(`INSERT INTO ${schema}.topics 
        (name, created_on)
        VALUES
        ($1,$2) RETURNING *`,[name, new Date()])
    })
}

module.exports = {
    createTopic
}
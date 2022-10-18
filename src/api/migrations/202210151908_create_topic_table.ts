exports.up = (knex:any) => {
    const { schemaName } = knex.client.config;

    return knex.schema.raw(
        `CREATE TABLE ${schemaName}.topics (
            topic_id serial PRIMARY KEY,
            name VARCHAR ( 50 ) UNIQUE NOT NULL,
            created_on TIMESTAMP NOT NULL,
            updated_at TIMESTAMP
        );`
    )
}

exports.down = (knex:any) => {
    return null
}
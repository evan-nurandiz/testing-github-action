exports.up = (knex:any) => {
    const { schemaName } = knex.client.config;

    return knex.schema.raw(
        `CREATE TABLE ${schemaName}.news (
            news_id serial PRIMARY KEY,
            name VARCHAR ( 50 ) UNIQUE NOT NULL,
            body TEXT NOT NULL,
            status VARCHAR NOT NULL,
            topic_id INT NOT NULL,
            created_on TIMESTAMP NOT NULL,
            updated_at TIMESTAMP,
            CONSTRAINT topics
                FOREIGN KEY(topic_id) 
                REFERENCES topics(topic_id)
                ON DELETE SET NULL
        );
        CREATE INDEX "topic_id_index" ON "news"("topic_id");
        CREATE INDEX "status_index" ON "news"("status");
        `
    )
}

exports.down = (knex:any) => {
    return null
}
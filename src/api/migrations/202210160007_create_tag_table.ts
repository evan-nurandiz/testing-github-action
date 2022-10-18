exports.up = (knex:any) => {
    const { schemaName } = knex.client.config;

    return knex.schema.raw(
        `CREATE TABLE ${schemaName}.tags (
            tag_id serial PRIMARY KEY,
            name VARCHAR ( 50 ) NOT NULL,
            news_id INT NOT NULL,
            created_on TIMESTAMP NOT NULL,
            updated_at TIMESTAMP,
            CONSTRAINT news
                FOREIGN KEY(news_id) 
                REFERENCES news(news_id)
                ON DELETE CASCADE
        );
        
        CREATE INDEX "news_id_index" ON "tags"("news_id")
        `
    )
}

exports.down = (knex:any) => {
    return null
}
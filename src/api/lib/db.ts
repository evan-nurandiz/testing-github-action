import * as dotenv from 'dotenv';
import knex from 'knex';
import {DBOptionsInterface} from '../interface/db.interface';
dotenv.config()

export const dbOption:DBOptionsInterface = {
    client: 'pg',
    connection: {
      user: process.env.DB_USER!,
      database: process.env.DB_NAME!,
      port: parseInt(process.env.DB_PORT!, 10),
      host: process.env.DB_HOST!,
      password: process.env.DB_PASSWORD!
    },
    pool: {
        max: 1,
        min: 1,
    },
    schemaName: null
};

export const migrateDatabase = async(schemaName:string) => {
    let schema = 'public';
    if (schemaName) schema = schemaName;

    let options = {
        ...dbOption
    };

    options.schemaName = schema;

    try {
        const Knex = knex(options)
        const migratorConfig = {
            directory: 'src/api/migrations',
            tableName: `${schema}_migrations`,
            disableMigrationsListValidation: false
        };

        await Knex.migrate.latest(migratorConfig);

        Knex.destroy();

        console.log(`tenant migration for schema ${schemaName} completed`);
    } catch (err:any) {
        console.log(`tenant migration for schema ${schemaName} failed`);

        throw err.message;
    }
    
};

module.exports = {
    migrateDatabase
}
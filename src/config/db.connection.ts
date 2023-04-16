const initOptions = {/* initialization options */};
const dotenv = require('dotenv');
import pgPromise from 'pg-promise';

dotenv.config()

export const pgp = pgPromise(initOptions);

// Preparing the connection details:
const cn = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Creating a new database instance from the connection details:
export const db = pgp(cn);


// Exporting the database object for shared use:
module.exports = {
    pgp, db
};
import {createClient} from 'redis';

export const redis = createClient();

module.exports = {
    redis
}
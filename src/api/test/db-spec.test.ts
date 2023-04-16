import {migrateDatabase} from '../lib/db'

describe('db', () => {
    xit('checking test', () => {
        console.log('success');
    })

    xit('should migrate database', () => {
        return migrateDatabase('public');
    })
})
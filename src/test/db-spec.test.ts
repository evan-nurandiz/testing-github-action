import {migrateDatabase} from '../api/lib/db'



describe('db', () => {
    xit('checking test', () => {
        console.log('success');
    })

    it('should migrate database', () => {
        return migrateDatabase('public');
    })
})
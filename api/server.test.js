// Write your tests here
// const request = require('supertest');
// const server = require('./server');
// const db = require('../data/dbConfig');

// beforeAll(async () => {
//   await db.migrate.rollback();
//   await db.migrate.latest();
// });

// beforeEach(async () => {
//   await db('users').truncate();
// });

// afterAll(async () => {
//   await db.destroy();
// });


  
test('environment is testing', () =>{
  expect(process.env.NODE_ENV).toBe('testing')
})

// describe('[POST] /api/auth/register', () => {
//     test('returns 201 when registering a new user', async () => {
//         await request(server)
//         .post('/api/auth/register')
//         // .send({ username: 'Marvel', password: 'foo' })
        
//         .expect(201)
//     })
        
// })
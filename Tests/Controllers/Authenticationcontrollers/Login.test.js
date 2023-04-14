const { db } = require('../../../Database/Database');
const { server } = require('../../../server');
const request = require('supertest');
const { Login } = require('../../../Controllers/Authenticationcontrollers/Login');
const portfinder = require('portfinder');

describe('Login', () => {
    let port;
    let instance;
  
    beforeAll(async () => {
      port = await portfinder.getPortPromise();
      instance = server.listen(port);
    });

    afterAll(async () => {
       await instance.close();
      });

    it('a successful login should return statuscode 200', async () => {
        await db.connect();
        const res = await request(server).post('/auth/login').send({username: 'testuser15', password: 'testpass'});
        expect(res.status).toBe(200);
    });

    it('a successful login should return a token', async () => {
        const res = await request(server).post('/auth/login').send({username: 'testuser15', password: 'testpass'});
        expect(res.body.token).toBeTruthy();
    });

    it('a failed login due to joi-schema should return statuscode 400', async () => {
        const res = await request(server).post('/auth/login').send({username: 'test', password: 'test'});
        expect(res.status).toBe(400);
    });

    it('a failed login due to wrong password should return statuscode 401 if not a database-error', async () => {
        const res = await request(server).post('/auth/login').send({username: 'testuser15', password: 'testpass1'})
        expect(res.status).toBe(401);
        
    });


    it('a failed login should return statuscode 500 if a database-error', async () => {
        db.disconnect(); 
        const res = await request(server).post('/auth/login').send({username: 'testuser15', password: 'testpass'})
        expect(res.status).toBe(500);
    });
});
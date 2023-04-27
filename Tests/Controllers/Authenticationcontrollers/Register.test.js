const request = require("supertest");
const { server } = require("../../../server");
const { Register } = require("../../../Controllers/AuthenticationControllers/Register");
const { db } = require("../../../Database/Database");

describe('Register new user endpoint', () => {

    it('POST /auth/register should respond with 201 if user is successfully added', async () => {
        await db.connect();
        const numb = Math.floor(Math.random() * 1000);

        const res = await request(server).post('/auth/register').send({username: `${numb}`, password: 'testpass', confirmPassword: 'testpass'});
        expect(res.status).toBe(201);
    });

    it('POST /auth/register should respond with 400 if body is ommitted or insufficient', async () => {
        const res = await request(server).post('/auth/register').send({username: 'p'});
        expect(res.status).toBe(400);
    });

    it('POST /auth/register should notify user about duplicate entry for username', async () => {
        const res = await request(server).post('/auth/register').send({username: 'test1', password: 'testpass', confirmPassword: 'testpass'});
        expect(res.status).toBe(500);
        expect(res.body).toBe('That username is already taken.');
    });

    afterAll(() => {
        db.disconnect();
    });
})
const request = require("supertest");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const { server } = require("../../../server");
const { db } = require("../../../Database/Database");

describe('Checks if members are returned when user is authenticated', () => {
    const payload = { username: 'Loki' };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const cookies = cookie.serialize('authToken', token);

    it('GET to /members should return 200 when user is authenticated', async () => {
        await db.connect();

        const res = await request(server)
        .get('/members/follows')
        .set('Cookie', cookies);
        expect(res.status).toBe(200);
    });

    it('GET to /members should return data when user is authenticated', async () => {
        const res = await request(server)
        .get('/members/follows')
        .set('Cookie', cookies);
        expect(res.body).toBeTruthy();
    });

    it('GET to /members should return 401 when user is not authenticated', async () => {

        const res = await request(server)
        .get('/members/follows')
        expect(res.status).toBe(401);
    });

   it('GET to /members should return 500 when database is not connected', async () => {
        db.disconnect();

        const res = await request(server)
        .get('/members/follows')
        .set('Cookie', cookies)
        expect(res.status).toBe(500);
    });

})
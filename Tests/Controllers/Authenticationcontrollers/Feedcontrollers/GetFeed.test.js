const { db } = require('../../../../Database/Database');
const dotenv = require('dotenv').config();
const { server } = require('../../../../server');
const request = require('supertest');
const { GetFeed } = require('../../../../Controllers/Feedcontrollers/GetFeed');

const jwt = require("jsonwebtoken");

describe('GetFeed', () => {
    const token = jwt.sign('testuser15', process.env.JWT_SECRET);
    it('a successful getfeed should return statuscode 200', async () => {
        await db.connect();
        const res = await request(server).get('/feed').set('Cookie', [`authToken=${token}`]);
        expect(res.status).toBe(200);
    });
    it('a successful getfeed should return data', async () => {
        const res = await request(server).get('/feed').set('Cookie', [`authToken=${token}`]);
        expect(res.body).toBeTruthy();
    });
    it('a failed getfeed should return statuscode 500', async () => {
        db.disconnect();
        const res = await request(server).get('/feed').set('Cookie', [`authToken=${token}`]);
        expect(res.status).toBe(500);
    }
    );
});

const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const { db } = require('../../../Database/Database');
const { server } = require('../../../server');

const payload = { username: 'Loki' };
const token = jwt.sign(payload, process.env.JWT_SECRET);
const cookies = cookie.serialize('authToken', token);

describe('GetFeed', () => {
  it('a successful getfeed should return statuscode 200', async () => {
    await db.connect();
    const res = await request(server)
      .get('/feed')
      .set('Cookie', cookies);

    expect(res.status).toBe(200);
  });

  it('a successful getfeed should return data', async () => {
    const res = await request(server)
      .get('/feed')
      .set('Cookie', cookies);
    expect(res.body).toBeTruthy();
  });

  it('a failed getfeed should return statuscode 500', async () => {
    db.disconnect();
    const res = await request(server)
      .get('/feed')
      .set('Cookie', cookies);
    expect(res.status).toBe(500);
  });
});

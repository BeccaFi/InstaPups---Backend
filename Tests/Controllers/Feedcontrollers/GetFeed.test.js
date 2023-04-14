const { db } = require('../../../Database/Database');
const dotenv = require('dotenv').config();
const { server } = require('../../../server');
const request = require('supertest');
const portfinder = require('portfinder');
const { GetFeed } = require('../../../Controllers/Feedcontrollers/GetFeed');

const jwt = require("jsonwebtoken");
const cookie = require('cookie');



describe('GetFeed', () => {
  const payload = { id: 123 };
  const secret = "test-secret";
  const token = jwt.sign(payload, secret);
  const cookies = cookie.serialize('cookieName', 'cookieValue');
  let port;
  let instance;

  beforeAll(async () => {
    port = await portfinder.getPortPromise();
    instance = server.listen(port);
  });

  afterAll(async () => {
      await instance.close();
    });

    it('a successful getfeed should return statuscode 200', async () => {
        await db.connect();
        const res = await request(server)
          .get('/feed')
          .set('Authorization', `Bearer ${token}`)
          .set('Cookie', cookies);

        expect(res.status).toBe(200);
    });
    
    it('a successful getfeed should return data', async () => {
        const res = await request(server)
          .get('/feed')
          .set('Authorization', `Bearer ${token}`)
          .set('Cookie', cookies);
        expect(res.body).toBeTruthy();
    });
    it('a failed getfeed should return statuscode 500', async () => {
        db.disconnect();
        const res = await request(server)
          .get('/feed')
          .set('Authorization', `Bearer ${token}`)
          .set('Cookie', cookies);
        expect(res.status).toBe(500);
    }
    );
});

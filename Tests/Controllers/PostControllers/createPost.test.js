const request = require("supertest");
const { server } = require("../../../server");
const { db } = require("../../../Database/Database");
const { createPost } = require("../../../Controllers/PostControllers/CreatePost");

describe('Check success when user submits a new create post form', () => {
    
    it('POST to /posts/create should return 201 when successfully added to database', async () => {
        await db.connect();

        const res = await request(server).post('/posts/create').send({datePosted: '2023-04-13 15:03', text: 'Today I ate a dust ball before realizing it was a dust ball. Now a guilty pleasure.', photos: [`http://dustballpics.com/?dustballnr=4`]});
        expect(res.status).toBe(201);
    });


    it('POST to /posts/create should return 400 if content (text/photos object) is fully omitted. Text or photos is required.', async () => {

        const res = await request(server).post('/posts/create').send({username: 'testuser15', datePosted: '2023-04-13 15:03'});
        expect(res.status).toBe(400);
    });

    afterAll(() => {
        db.disconnect();
    });

})
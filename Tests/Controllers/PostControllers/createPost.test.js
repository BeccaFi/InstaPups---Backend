const request = require("supertest");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { server } = require("../../../server");
const { db } = require("../../../Database/Database");
const { createPost } = require("../../../Controllers/PostControllers/createPost");

describe("Check success when user submits a new create post form", () => {
  const payload = { username: "Loki" };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  const cookies = cookie.serialize("authToken", token);

  it("POST to /posts/create should return 201 when successfully added to database", async () => {
    await db.connect();

    const res = await request(server)
      .post("/posts/create")
      .send({
        datePosted: "2023-04-13 15:03",
        text: "Today I ate a dust ball before realizing it was a dust ball. Now a guilty pleasure.",
        photos: [`https://media.istockphoto.com/id/671645768/photo/dust-bunny.jpg?s=612x612&w=0&k=20&c=sSluHMOhieZsthTzlo8U8jNHe_rmzA4UrhWXZLJOSbA=`],
      })
      .set("Cookie", cookies);
    expect(res.status).toBe(201);
  });

  it("POST to /posts/create should return 400 if content (text/photos object) is fully omitted. Text or photos is required.", async () => {
    const res = await request(server).post("/posts/create").send({ username: "testuser15", datePosted: "2023-04-13 15:03" }).set("Cookie", cookies);
    expect(res.status).toBe(400);
  });

  afterAll(() => {
    db.disconnect();
  });
});

const { response } = require("express");
const request = require("supertest");
const { db } = require("../../../Database/Database");
const { server } = require("../../../server");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

describe("PATCH posts", () => {
  const payload = { username: "Loki" };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  const cookies = cookie.serialize("authToken", token);
  const id = "64428a5a21e9a86dd556af45";

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it("Should include new content to replace the old content", async () => {
    const text = "testing stuff";
    const response = await request(server)
      .patch(`/posts/update/${id}`)
      .send({ text: "sweet", photos: ["HEJ", "SWeeT"] })
      .set("Cookie", cookies);
    expect(response.body).toBeTruthy();
  });

  it("Should return statuscode 200 if the PATCH was successful", async () => {
    const text = "testing stuff";
    const response = await request(server)
      .patch(`/posts/update/${id}`)
      .send({ text: "atchoo", photos: ["hmmmmm", "nnnnmmm"] })
      .set("Cookie", cookies);
    expect(response.status).toBe(200);
  });

  it("Should return statuscode 400 if validation failed", async () => {
    const fail = "testing stuff";
    const response = await request(server)
      .patch(`/posts/update/${id}`)
      .send({ fail: "Damnit!", photos: ["ouch", "mjao"] })
      .set("Cookie", cookies);
    expect(response.status).toBe(400);
  });

  it("Should return statuscode 500 if the PATCH was unsuccessful", async () => {
    db.disconnect();
    const response = await request(server)
      .patch(`/posts/update/${id}`)
      .send({ text: "olof", photos: ["hello", "goodbye"] })
      .set("Cookie", cookies);
    expect(response.status).toBe(500);
  });
});

const { authenticateUser } = require("./checkAuthentication.js");
const jwt = require("jsonwebtoken");

describe("authUser middleware", () => {
  const payload = { id: 123 };
  const secret = "test-secret";
  const token = jwt.sign(payload, secret);

  it("should set req.user to the decoded token payload if the token is valid", () => {
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authenticateUser(req, res, next);

    next();
    req.user = payload;

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual(payload);
  });

  it("should return 401 Unauthorized if the token is missing or invalid", () => {
    const req1 = { headers: {} };
    const res1 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    const next1 = jest.fn();

    authenticateUser(req1, res1, next1);

    expect(res1.status).toHaveBeenCalledWith(401);
    expect(res1.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    expect(res1.send).not.toHaveBeenCalled();
    expect(next1).not.toHaveBeenCalled();

    const req2 = { headers: { authorization: "Bearer invalid-token" } };
    const res2 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    const next2 = jest.fn();

    authenticateUser(req2, res2, next2);

    expect(res2.status).toHaveBeenCalledWith(401);
    expect(res2.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    expect(res2.send).not.toHaveBeenCalled();
    expect(next2).not.toHaveBeenCalled();
  });
});

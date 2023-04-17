const jwt = require("jsonwebtoken");
const { authenticateUser } = require("../../middleware/checkAuthentication.js");

jest.mock("jsonwebtoken");

describe("authenticateUser middleware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 401 if no authToken is given", () => {
    const req = {
      cookies: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authenticateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  test("should return 401 if authToken is invalid", () => {
    const req = {
      cookies: {
        authToken: "invalidToken",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    jwt.verify.mockImplementationOnce(() => {
      throw new Error();
    });

    authenticateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  test("calls next with the decoded token if authToken is valid", () => {
    const req = {
      cookies: {
        authToken: "validToken",
      },
    };
    const res = {};
    const next = jest.fn();
    const decodedToken = { username: "testUser" };
    jwt.verify.mockReturnValueOnce(decodedToken);

    authenticateUser(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual(decodedToken);
  });
});

const { boxController } = require("../../controllers");
const { boxService } = require('../../services');
const httpMocks = require("node-mocks-http");
const newBox = require("../mock-data/newBox.json");

//Mock insert box function to isolate controller
boxService.createBox = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("boxController.postBox", () => {
    beforeEach(() => {
        req.body = newBox;
    });

    it("Should have an postBox function", () => {
        expect(typeof boxController.postBox).toBe("function");
    });

    it("Should call BoxService.createBox", async () => {
        await boxController.postBox(req, res, next);
        expect(boxService.createBox).toBeCalledWith(newBox);
    });

    it("Should return 201 response code", async() => {
        await boxController.postBox(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("Should handle error", async () => {
        const errorMessage = { message: "Error creating box!" };
        const rejectedPromise = Promise.reject(errorMessage)
        boxService.createBox.mockReturnValue(rejectedPromise);
        await boxController.postBox(req, res, next);
        expect(next).toBeCalledWith(errorMessage)
    })
})
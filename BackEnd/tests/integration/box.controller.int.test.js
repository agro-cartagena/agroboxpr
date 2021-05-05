const request = require("supertest");
const app = require("../../app");
const db = require('../../db/mdb')
const newBox = require("../mock-data/newBox.json");
const dotenv = require('dotenv');
dotenv.config();

const endpointUrl = "/api/box/";

describe(endpointUrl, () => {
    beforeAll(async () => {
        //Connect to MongoDB cluster
        await db.connect(process.env.CONNECTION_STRING, function (err) {
            if (err) {
                console.log('Unable to connect to Mongo.')
                process.exit(1)
            } else {
                console.log('Connected to Mongo')
            }
        })
    });

    afterAll(() => {
        db.close(function (err) {
            if (err) {
                console.log('Unable to close Mongo connection.')
                process.exit(1)
            } else {
                console.log('Mongo connection closed')
            }
        });
    });

    it("POST " + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newBox);
        expect(response.statusCode).toBe(201);
        expect(response.body.boxName).toBe(newBox.boxName)
    })


})
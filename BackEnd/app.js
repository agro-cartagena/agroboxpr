const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./db/mdb')
const { authRouter ,productRouter, boxRouter} = require('./routes');

//Get environment variables
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Use Express Routers
app.use('/api/product', productRouter);
app.use('/api/box', boxRouter);
app.use('/api/auth', authRouter);

module.exports = app;
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const { productRouter } = require('./routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Use Express Routers
app.use('/api/product', productRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
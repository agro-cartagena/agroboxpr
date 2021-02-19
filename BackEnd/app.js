const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./db/mdb')
const { productRouter } = require('./routes');

//Get environment variables
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log("Connection String: ", process.env.CONNECTION_STRING)

db.connect(process.env.CONNECTION_STRING, function(err) {
    if (err) {
      console.log('Unable to connect to Mongo.')
      process.exit(1)
    } else {
      console.log('Connected to Mongo')
    }
})

//Use Express Routers
app.use('/api/product', productRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
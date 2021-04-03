const app = require("./app")
const db = require('./db/mdb')
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;

//Connect to MongoDB cluster
db.connect(process.env.CONNECTION_STRING, function(err) {
    if (err) {
      console.log('Unable to connect to Mongo.')
      process.exit(1)
    } else {
      console.log('Connected to Mongo')
    }
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
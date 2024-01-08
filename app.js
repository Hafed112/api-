require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();
const cors = require("cors")
const registerRouter=require("./routes/user")
const proudctRouter=require("./routes/product")
const reviewRouter=require("./routes/reviewCustomer")
const auth = require("./middleware/auth");


app.use(express.json());
app.use(cors());


app.use('/api/v1',registerRouter)
app.use('/api/v1/product',proudctRouter)
app.use('/api/v1/reviewCustomer',reviewRouter)

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// Logic goes here

module.exports = app;
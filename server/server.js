require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const authCtrl = require("./controllers/authCtrl");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log(`db connected`)
});

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.listen(SERVER_PORT, () => {
  console.log(`listening on port: ${SERVER_PORT}`);
});

// Authorization Controller Endpoints
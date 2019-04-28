require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const authCtrl = require("./controllers/authCtrl");
const songCtrl = require("./controllers/songCtrl");
const createCtrl = require("./controllers/createCtrl");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log(`db connected`);
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

// User Info & Authorization Endpoints
app.post("/auth/signup", authCtrl.signup);
app.post("/auth/login", authCtrl.login);
app.put("/auth/editInfo/:id", authCtrl.editInfo);
app.get("/auth/user", authCtrl.userInfo);
app.get("/auth/logout", authCtrl.logout);

// Song Info Endpoints
app.get("/user/songs/:userID", songCtrl.getUserSongsList);
app.get("/song/:songID", songCtrl.getSongInstance);
app.get("/song/:songID/:languageID", songCtrl.getSongTranslation);
app.get("/songs/recent", songCtrl.getRecentSongs);

// Create Song Endpoints
app.post("/create", createCtrl.createNewEverything);

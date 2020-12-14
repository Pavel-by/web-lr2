const express = require("express");
const app = express();
const passport = require("passport");
const routes = require("./routes");
const bodyParser = require("body-parser");

app.set("view engine", "pug");
app.locals.basedir = __dirname;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require("cookie-parser")());
app.use(require("express-session")({
    secret: "lr2 is secret. Too secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static('public'));
app.use(routes);

app.listen(80, "lr2.test", () => {});
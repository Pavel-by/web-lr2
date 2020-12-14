const router = require("express").Router();
const passport = require("passport");
const CustomStrategy = require("passport-custom");
const users = require("./users");
const books = require("./books");
const booksRoutes = require("./routes/books-routes");

const authenticate = function(req, res, next) {
    passport.authenticate('custom', {session: true}, () => {
        next();
    })(req, res, next);
};

passport.use('custom', new CustomStrategy((req, callback) => {
    if (!req.body.email) {
        return callback(null, false, {message: "Invalid email"});
    }

    users.findByEmail(req.body.email, (err, user) => {
        callback(null, user, {message: err});
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    users.findById(id, (err, user) => {
        done(null, user, {message: err});
    });
});

router.use(booksRoutes);

router.post(
    "/login",
    authenticate,
    (req, res, next) => {
        req.logout();
        passport.authorize('custom', {session: true}, (err, user, info) => {
            if (!user) {
                res.status(401);
                res.send(err);
            } else {
                req.logIn(user, (err) => {
                    if (err) {
                        res.status(401);
                    } else {
                        res.end();
                    }
                });
            }
        })(req, res, next);
    }
);

router.post(
    "/register",
    (req, res, next) => {
        let user = {
            name: req.body.name,
            email: req.body.email,
            age: Number.parseInt(req.body.age),
        };

        let result = users.put(user);

        if (result.error) {
            res.status(400);
        }

        res.send(result);
    }
);

router.get(
    "/logout",
    (req, res, next) => {
        req.logout();
        res.redirect("/");
    }
);

router.get("*", (req, res, next) => {
    res.render("404");
});

module.exports = router;
const passport = require("passport");

module.exports = (req, res, next) => {
    if (req.user)
        next();
    else {
        res.status(401);
        res.end();
    }
};
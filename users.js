const fs = require("fs");
const utils = require("./utils");
const PATH = "storage/users.json";

let db;

try {
    db = JSON.parse(fs.readFileSync(PATH));

    if (!Array.isArray(db.users) || !Number.isInteger(db.nextId))
        throw `Wrong users database structure: ${db}`;

    console.log("Database users: ");
    console.log(db.users);
} catch (e) {
    console.log("Failed to read users");
    console.log(e);
    db = generateDb();
}

function generateDb() {
    return {
        users: [],
        nextId: 1,
    }
}

function save() {
    try {
        fs.writeFile(PATH, JSON.stringify(db));
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    findById: (id, callback) => {
        let user = db.users.find((user) => user.id.toString() === id.toString());

        if (!user)
            callback("User was not found", null);
        else
            callback(null, utils.clone(user));
    },
    findByEmail: (email, callback) => {
        let user = db.users.find((user) => user.email === email.toString());

        if (!user)
            callback("User was not found", null);
        else
            callback(null, utils.clone(user));
    },
    put: (user) => {
        if (!user)
            return {error: `Wrong user object: ${JSON.stringify(user)}`};

        if (!user.name)
            return {error: `Wrong user name: ${user.name}`};

        if (!user.email)
            return {error: `Wrong user email: ${user.email}`};

        if (!Number.isInteger(user.age))
            return {error: `Wrong user age: ${user.age}`};

        if (db.users.find((existingUser) => existingUser.email === user.email))
            return {error: `User with email ${user.email} is already exists`};

        user.id = db.nextId++;
        user.registerDate = (new Date()).toISOString();

        db.users.push(user);
        save();

        return {success: true};
    }
};
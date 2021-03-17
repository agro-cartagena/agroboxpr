const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { userDb } = require('../db')

const { registerNewUserDb, findUserByFilterDb } = userDb

const registerUser = async (name, email, password, phone) => {

    const token = await findUserByFilterDb({ email: email })
        .then(async user => {
            if (user.length > 0) {
                throw new Error("Email already exists!")
            } else {
                const saltRounds = 10;
                const toky = await bcrypt.hash(password, saltRounds).then(async (hash) => {
                    const newUser = {
                        name: name,
                        email: email,
                        password: hash,
                        phone: phone
                    }

                    const tok = await registerNewUserDb(newUser).then(res => {
                        // console.log("New user created!", res)
                        const user = res

                        let access_token = createJWT(
                            user.email,
                            user._id
                        );

                        return access_token
                    }).catch(err => {
                        throw new Error(err.message)
                    })
                    return tok
                }).catch(err => {
                    throw new Error(err.message)
                });
                return toky
            }
        }).catch(err => {
            throw new Error(err.message)
        })
    return token
}

const loginUser = async (email, password) => {
    const token = await findUserByFilterDb({ email: email }).then(async user => {
        console.log("HERE")
        if (user.length < 1) {
            throw new Error("Invalid Credentials!")
        } else {
            console.log("THERE", user)
            console.log(password)
            const isMatch = await bcrypt.compare(password, user[0].password)

            console.log("Match?: ", isMatch)
            if (!isMatch) {
                console.log("Wrong password!")
                throw new Error("Invalid Credentials!")
            }

            let access_token = createJWT(
                user[0].email,
                user[0]._id,
                3600
            );
            console.log("Access Token", access_token)
            return access_token

        }
    }).catch(err => {
        throw new Error(err.message)
    });
    return token
}

const createJWT = (email, userId, duration) => {
    const payload = {
        email,
        userId,
        duration
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: duration,
    });
};

module.exports = {
    registerUser,
    loginUser
}
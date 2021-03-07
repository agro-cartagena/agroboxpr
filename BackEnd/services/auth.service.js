const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { userDb } = require('../db')

const { registerNewUserDb, findUserByFilterDb } = userDb

const registerUser = async (name, email, password) => {

    findUserByFilterDb({ email: email })
        .then(user => {
            if (user.length > 0) {
                console.log("Email already exists!")
            } else {
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, async function (err, salt) {
                    await bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        const newUser = {
                            name: name,
                            email: email,
                            password: hash
                        }

                        return registerNewUserDb(newUser).then(res => {
                            console.log("New user created!")
                        }).catch(err => {
                            throw new Error(err.message)
                        })
                    });
                });
            }
        }).catch(err => {
            throw new Error(err.message)
        })
    // try {
    //   return await createProductDb(product)
    // } catch (e) {
    //   throw new Error(e.message)
    // }
}

const loginUser = async (email, password) => {
    const token = await findUserByFilterDb({ email: email }).then(async user => {
        console.log("HERE")
        if (user.length < 1) {
            // return res.status(404).json({
            //     errors: [{ user: "not found" }],
            // });
            console.log("User not found!")
        } else {
            console.log("THERE", user)
            console.log(password)
            const isMatch = await bcrypt.compare(password, user[0].password)

            console.log("Match?: ", isMatch)
            if (!isMatch) {
                // return res.status(400).json({
                //     errors: [{
                //         password:
                //             "incorrect"
                //     }]
                // });
                console.log("Wrong password!")
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
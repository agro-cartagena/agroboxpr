const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const { userDb, tokenDb } = require('../db');
const { sendEmail } = require('../utils/email/email')
const { ObjectID } = require("mongodb");


const { registerNewUserDb, findUserByFilterDb, findUserByQueryAndUpdate, findAdminAccountsDb, findUserByIdDb } = userDb
const { createResetPasswordTokenDb } = tokenDb

const registerUser = async (name, email, password, phone) => {

    //Check if a user exists with the given email
    const user = await findUserByFilterDb({ email: email })
    
    //If user exists return false
    if (user.length > 0) {
        return false
    } //If user doesn't exist create new user and return auth token.
    else {
        //create new user with hashed password.
        const saltRounds = 10;
        const token = await bcrypt.hash(password, saltRounds).then(async (hash) => {
            const newUser = {
                name: name,
                email: email,
                password: hash,
                phone: phone,
                role: "user"
            }

            return await registerNewUserDb(newUser).then(res => {
                // console.log("New user created!", res)
                const user = res

                let access_token = createJWT(
                    user.email,
                    user._id,
                    user.role
                );

                return access_token
            }).catch(err => {
                throw new Error(err.message)
            })
        }).catch(err => {
            throw new Error(err.message)
        });

        return token
    }
}

const loginUser = async (email, password) => {
    // Check if a user exists with the given email
    const user = await findUserByFilterDb({ email: email });

    // If user not found return false
    if (user.length < 1) {
        return false
    } else {
        // if user found check if password is correct
        const isMatch = await bcrypt.compare(password, user[0].password)
        if (!isMatch) {
            return false
        }

        // If password is correct create JWT
        let access_token = createJWT(
            user[0].email,
            user[0]._id,
            user[0].role
            // 3600
        );

        // Return access token to client
        return access_token
    }
}

const promoteUserToAdmin = async (email) => {
    const updateDocument = {
        "$set": {
            "role": "admin"
        }
    }

    // Find user by email
    // If fount promote to admin and return true
    // Else return false
    return await findUserByQueryAndUpdate({ email: email }, updateDocument).then(async user => {
        console.log(user)

        // If user found and updated return true else return false
        if (user.value) {
            return true
        } else {
            return false
        }
    }).catch(err => {
        throw new Error(err.message)
    });
}

const demoteAdmin = async (user_id) => {
    const updateDocument = {
        "$set": {
            "role": "user"
        }
    }

    // Find user by email
    // If fount demote to user and return true
    // Else return false
    return await findUserByQueryAndUpdate({ _id: ObjectID(user_id) }, updateDocument).then(async user => {

        // If user found and updated return true else return false
        if (user.value) {
            return true
        } else {
            return false
        }
    }).catch(err => {
        throw new Error(err.message)
    });
}

const updateUserPassword = async (userId, newPasswordInfo) => {
    const old_Password = newPasswordInfo.old_Password;
    const new_Password = newPasswordInfo.new_Password

    // Find user and check in password matches
    const user = await findUserByFilterDb({ _id: ObjectID(userId) }).then(async user => {
        
        if (user.length < 1) {
            return false
        } else {
            const isMatch = await bcrypt.compare(old_Password, user[0].password)

            if (!isMatch) {
                return false
            } else {
                return user
            }
        }
    }).catch(err => {
        throw new Error(err.message)
    });

    console.log()

    // If user found and password matches, change password. Else return false
    if(user){
        const saltRounds = 10;
        return await bcrypt.hash(new_Password, saltRounds).then(async (hash) => {
            
            const updateDocument = {
                "$set": {
                    "password": hash
                }
            }
            return await findUserByQueryAndUpdate({ _id: ObjectID(userId) }, updateDocument).then(async user => {
    
                if (user.value) {
                    return true
                } else {
                    return false
                }
            }).catch(err => {
                throw new Error(err.message)
            });
            
        }).catch(err => {
            throw new Error(err.message)
        });
    } else {
        return false;
    }
}

const updateUserInfo = async (userId, newUserInfo) => {
    const updateDocument = {
        "$set": newUserInfo
    }

    return await findUserByQueryAndUpdate({ _id: ObjectID(userId) }, updateDocument).then(async user => {

        if (user.value) {
            return true
        } else {
            return false
        }
    }).catch(err => {
        throw new Error(err.message)
    });
}

const readAllAdmin = async () => {
	// console.log('\nRetrieving boxes \n')
	const query = { role: "admin" }

	try {
		return await findAdminAccountsDb(query)
	} catch (e) {
		throw new Error(e.message)
	}
}

const readUserById = async (userId) => {
	try {
		return await findUserByIdDb(userId)
	} catch (e) {
		throw new Error(e.message)
	}
}

const forgotPassword = async (email) => {
    //Check if a user exists with the given email
    const user = await findUserByFilterDb({ email: email })

    // If user exists not exist return false
    if (user.length < 1) {
        return false
    } // Else check if token exists
    else{
        // let token = await Token.findOne({ userId: user._id });
        // if (token) { 
        //       await token.deleteOne()
        // };
        const userEmail = user[0].email
        const userName = user[0].name

        let passwordResetToken = crypto.randomBytes(32).toString("hex");

        const bcryptSalt = 10;
        const hash = await bcrypt.hash(passwordResetToken, Number(bcryptSalt));

        const newToken = {
            user_id : user._id,
            token : hash,
            created_date : Date.now(),
            expires : 3600 // Expiration time in seconds
        }

        const createdToken = await createResetPasswordTokenDb(newToken)

        const link = `/passwordReset?token=${passwordResetToken}&id=${user._id}`;
        return await sendEmail(userEmail,"Password Reset Request",{name: userName, link: link,},"./template/resetPassword.handlebars");
    }
}

const createJWT = (email, userId, role) => {
    const payload = {
        email,
        userId,
        role
        // duration
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        // expiresIn: duration,
    });
};

module.exports = {
    registerUser,
    loginUser,
    promoteUserToAdmin,
    demoteAdmin,
    readAllAdmin,
    updateUserPassword,
    updateUserInfo,
    readUserById,
    forgotPassword
}
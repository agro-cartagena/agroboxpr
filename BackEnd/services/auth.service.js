const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { userDb } = require('../db');
const { ObjectID } = require("mongodb");

const { registerNewUserDb, findUserByFilterDb, findUserByEmailAndUpdate, findAdminAccountsDb, findUserByIdDb } = userDb

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
                        phone: phone,
                        role: "user"
                    }

                    const tok = await registerNewUserDb(newUser).then(res => {
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
                user[0].role
                // 3600
            );
            console.log("Access Token", access_token)
            return access_token

        }
    }).catch(err => {
        throw new Error(err.message)
    });
    return token
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

const promoteUserToAdmin = async (email) => {
    const updateDocument = {
        "$set": {
            "role": "admin"
        }
    }

    await findUserByEmailAndUpdate({ email: email }, updateDocument).then(async user => {

        if (user) {
            console.log("User has been promoted", user)
        } else {
            console.log("User not found")
        }
    }).catch(err => {
        throw new Error(err.message)
    });
}

const demoteAdmin = async (email) => {
    const updateDocument = {
        "$set": {
            "role": "user"
        }
    }

    await findUserByEmailAndUpdate({ email: email }, updateDocument).then(async user => {

        if (user) {
            console.log("User has been promoted", user)
        } else {
            console.log("User not found")
        }
    }).catch(err => {
        throw new Error(err.message)
    });
}

const updateUser = async (userId, newUserInfo) => {
    const updateDocument = {
        "$set": newUserInfo
    }

    await findUserByEmailAndUpdate({ _id: ObjectID(userId) }, updateDocument).then(async user => {

        if (user) {
            console.log("User info has been succesfully updated.", user)
        } else {
            console.log("User not found")
        }
    }).catch(err => {
        throw new Error(err.message)
    });
}

const updateUserPassword = async (userId, newPasswordInfo) => {
    const old_Password = newPasswordInfo.old_Password;
    const new_Password = newPasswordInfo.new_Password

    const user = await findUserByFilterDb({ _id: ObjectID(userId) }).then(async user => {
        console.log("HERE")
        if (user.length < 1) {
            return false
        } else {
            // console.log("THERE", user)
            // console.log(password)
            const isMatch = await bcrypt.compare(old_Password, user[0].password)

            if (!isMatch) {
                console.log("Wrong password!")
                return false
            } else {
                return user
            }
        }
    }).catch(err => {
        throw new Error(err.message)
    });

    if(user){
        const saltRounds = 10;
        await bcrypt.hash(new_Password, saltRounds).then(async (hash) => {
            
            const updateDocument = {
                "$set": {
                    "password": hash
                }
            }
            await findUserByEmailAndUpdate({ _id: ObjectID(userId) }, updateDocument).then(async user => {
    
                if (user) {
                    console.log("User info has been succesfully updated.", user)
                } else {
                    console.log("User not found")
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

const readAdminEmails = async () => {
	// console.log('\nRetrieving boxes \n')
	const query = { role: "admin" }

	try {
		const adminAccounts = await findAdminAccountsDb(query)
		//Only return to client: name, price, imageUrl & boxId
		const response = adminAccounts.map(admin => {
			return {
                _id:admin._id,
                email: admin.email,
                role: admin.role,
                phone: admin.phone
			}
		})
		return response
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

module.exports = {
    registerUser,
    loginUser,
    promoteUserToAdmin,
    demoteAdmin,
    updateUser,
    readAdminEmails,
    updateUserPassword,
    readUserById
}
const { authService } = require('../services')

const { registerUser, loginUser, promoteUserToAdmin, demoteAdmin, readAllAdmin, updateUserPassword, updateUserInfo, readUserById, forgotPassword, 
        resetPassword, logoutUser } = authService

const postSignup = async (req, res, next) => {
    const { name, email, password, phone } = req.body
    
    try {
        await registerUser(name, email, password, phone).then(result => {
            if(result){
                res.status(201).send(result)
                next()
            } else{
                res.status(409).json({
                    errors: [{ email: "Email already exists!" }],
                });
            }
        })
    } catch (err) {
        res.sendStatus(500)
        next(err)
    }
}

const postLogin = async (req, res, next) => {
    const { email, password } = req.body
    
    try {
        //
        await loginUser(email, password).then(result => {
            if(result){
                res.status(200).send(result)
                next()
            } else{
                res.status(403).json({
                    errors: [{ user: "Invalid Credentials!" }],
                });
            }
        })
    } catch (err) { 
        res.sendStatus(500)
        next(err)
    }
}

const postLogout = async (req, res, next) => {
    const userId = req.userId
    
    try {
        //
        await logoutUser(userId).then(result => {
            if(result){
                res.status(200).send()
                next()
            } else{
                res.status(403).json({
                    errors: [{ user: "Invalid Credentials!" }],
                });
            }
        })
    } catch (err) { 
        res.sendStatus(500)
        next(err)
    }
}

const promoteUser = async (req, res, next) => {
    const { email } = req.body

    try {
        await promoteUserToAdmin(email).then(result => {
            console.log("User: ", result)
            if(result){
                res.status(200).send()
                next()
            } else{
                res.status(404).json({
                    errors: [{ user: "User not found." }],
                });
            }
        })
    } catch(err) {
        res.sendStatus(500)
        next(err)
    }
}

const demoteUser = async (req, res, next) => {
    const user_id = req.params.id

    try {
        await demoteAdmin(user_id).then(result => {
            if(result){
                res.status(200).send()
                next()
            } else{
                res.status(404).json({
                    errors: [{ user: "User not found." }],
                });
            }
        })
    } catch(err) {
        res.sendStatus(500)
        next(err)
    }
}

const putUserPassword = async (req, res, next) => {
    const newPasswordInfo = req.body;
    const userId = req.userId

    try {
        await updateUserPassword(userId, newPasswordInfo).then(result => {
            if(result){
                res.status(200).send()
            } else{
                res.status(403).json({
                    errors: [{ user: "Invalid credentials." }],
                });
            }
        })
    } catch(err) {
        res.sendStatus(500)
        next(err)
    }
}

const putUserPersonalInfo = async (req, res, next) => {
    const { name, email, phone } = req.body;
    const userId = req.userId

    const personalInfo = {
        name,
        email,
        phone
    }

    try {
        await updateUserInfo(userId, personalInfo).then(result => {
            if(result){
                res.status(200).send()
            } else{
                res.status(404).json({
                    errors: [{ user: "User not found." }],
                });
            }
        })
    } catch(err) {
        res.sendStatus(500)
        next(err)
    }
}

const putUserAddress = async (req, res, next) => {
    const { address, city, state, zipcode } = req.body;
    const userId = req.userId

    const userAddress = {
        address, 
        city, 
        state, 
        zipcode
    }

    try {
        await updateUserInfo(userId, userAddress).then(result => {
            if(result){
                res.status(200).send()
            } else{
                res.status(404).json({
                    errors: [{ user: "User not found." }],
                });
            }
        })
    } catch(err) {
        res.sendStatus(500)
        next(err)
    }
}

const getAllAdmin = async (req, res, next) => {
	try {
		await readAllAdmin().then((adminList) => {
            //Only return to client: name, price, imageUrl & boxId
            const response = {}

		    adminList.forEach(admin => {
                let initial = admin.name[0]
                if(!response.hasOwnProperty(initial))
                    response[initial] = []

                response[initial].push({
                    _id:admin._id,
                    name: admin.name,
                    phone: admin.phone
                })
		})
			res.status(200).send(response)
		})
	} catch (e) {
		res.sendStatus(500) && next(e)
	}
}


const getUser = async (req, res, next) => {
    const userId = req.userId;

	try {
		await readUserById(userId).then((user) => {
            const response = {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                city: user.city,
                state: user.state,
                zipcode: user.zipcode,
            }
			res.status(200).send(response)
		})
	} catch (e) {
		res.sendStatus(500) && next(e)
	}
}

const getIsUserActive = async (req, res, next) => {
    const userId = req.userId;

	try {
		await readUserById(userId).then((user) => {
            console.log(user)
            const response = {
                is_active: user.is_active
            }
			res.status(200).send(response)
		})
	} catch (e) {
		res.sendStatus(500) && next(e)
	}
}

const postForgotPassword = async (req, res, next) => {
    const { email } = req.body
    
    try {
        //
        await forgotPassword(email).then(result => {
            if(result){
                res.status(200).send()
                next()
            } else{
                res.status(403).json({
                    errors: [{ user: "Invalid Credentials!" }],
                });
            }
        })
    } catch (err) { 
        res.sendStatus(500)
        next(err)
    }
}

const postResetPassword = async (req, res, next) => {
    const { user_id, reset_token, new_password } = req.body
    
    try {
        //
        await resetPassword(user_id, reset_token, new_password).then(result => {
            if(result){
                res.status(200).send()
                next()
            } else{
                res.status(400).json({
                    errors: [{ token: "Invalid or expired Token!" }],
                });
            }
        })
    } catch (err) { 
        res.sendStatus(500)
        next(err)
    }
}

module.exports = {
    postSignup,
    postLogin,
    promoteUser,
    demoteUser,
    getAllAdmin,
    putUserPassword,
    putUserPersonalInfo,
    putUserAddress,
    getUser,
    postForgotPassword,
    postResetPassword,
    postLogout,
    getIsUserActive
}
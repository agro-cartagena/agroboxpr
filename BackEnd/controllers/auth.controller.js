const { authService } = require('../services')

const { registerUser, loginUser, promoteUserToAdmin, demoteAdmin, updateUser, readAdminEmails, updateUserPassword } = authService

const postSignup = async (req, res, next) => {
    const { name, email, password, phone } = req.body
    
    try {
        await registerUser(name, email, password, phone).then(result => {
            console.log("Result: ", result)
            res.status(201).send(result)
            next()
        })
    } catch (err) {
        console.log("Error: ", err.message)

        if(err.message === "Email already exists!"){
            res.status(409).json({
                errors: [{ email: "Email already exists!" }],
            });
        }else {
            res.sendStatus(500)
        }
        next(err)
    }
}

const postLogin = async (req, res, next) => {
    const { email, password } = req.body
    //TODO: Add validation for new user
    try {
        await loginUser(email, password).then(result => {
            console.log("Result: ", result)
            res.status(200).send(result)
            next()
        })
    } catch (err) {
        console.log(err.message)
        if(err.message === "Invalid Credentials!"){
            res.status(403).json({
                errors: [{ user: "Invalid Credentials!" }],
            });
        } else {
            res.sendStatus(500)
        }
        next(err)
    }
}

const promoteUser = async (req, res, next) => {
    const { email } = req.body

    try {
        await promoteUserToAdmin(email).then(result => {
            console.log(result)
            res.status(200).send()
        })
    } catch(err) {
        next(err)
    }
}

const demoteUser = async (req, res, next) => {
    const { email } = req.body

    try {
        await demoteAdmin(email).then(result => {
            console.log(result)
            res.status(200).send()
        })
    } catch(err) {
        next(err)
    }
}

const updateUserInfo = async (req, res, next) => {
    const newUserInfo = req.body;
    const userId = req.userId

    try {
        await updateUser(userId, newUserInfo).then(result => {
            console.log(result)
            res.status(200).send()
        })
    } catch(err) {
        next(err)
    }
}

const putUserPassword = async (req, res, next) => {
    const newPasswordInfo = req.body;
    const userId = req.userId

    try {
        await updateUserPassword(userId, newPasswordInfo).then(result => {
            console.log(result)
            res.status(200).send()
        })
    } catch(err) {
        next(err)
    }
}


const getAdminEmails = async (req, res, next) => {
	try {
		await readAdminEmails().then((adminList) => {
			res.status(200).send(adminList)
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

module.exports = {
    postSignup,
    postLogin,
    promoteUser,
    demoteUser,
    updateUserInfo,
    getAdminEmails,
    putUserPassword
}
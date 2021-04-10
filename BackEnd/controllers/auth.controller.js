const { authService } = require('../services')

const { registerUser, loginUser } = authService

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

module.exports = {
    postSignup,
    postLogin
}
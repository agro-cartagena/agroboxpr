const { authService } = require('../services')

const { registerUser, loginUser } = authService

const postSignup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    //TODO: Add validation for new user
    try {
        await registerUser(name, email, password).then(result => {
            console.log("Result: ", result)
            res.sendStatus(201)
            next()
        })
    } catch (e) {
        console.log("Error: ", e.message)
        if(e.message === "Email already exists!"){
            res.status(409).json({
                errors: [{ email: "Email already exists!" }],
            });
        }else {
            res.sendStatus(500)
        }
        
        
        next(error)
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
    } catch (e) {
        console.log(e.message)
        if(e.message === "Invalid Credentials!"){
            res.status(403).json({
                errors: [{ user: "Invalid Credentials!" }],
            });
        } else {
            res.sendStatus(500)
        }
        next(error)
    }
}

module.exports = {
    postSignup,
    postLogin
}
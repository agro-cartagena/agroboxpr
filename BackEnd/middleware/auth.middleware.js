const jwt = require('jsonwebtoken')
const { authService } = require('../services')


const { userDb } = require('../db');
const { registerNewUserDb, findUserByFilterDb, findUserByQueryAndUpdate, findAdminAccountsDb, findUserByIdDb } = userDb

const { getAccessToken } = authService

const auth = async (req, res, next) => {
	try {
		const token = req.header('x-access-token')

		if (!token) {
			return res
				.status(403)
				.json({ msg: 'No authentication token, authorization denied' })
		}

		const verified = jwt.verify(
			token,
			process.env.JWT_SECRET,
			function (err, decoded) {
				if (!err) return decoded

				console.log('Error', err)

				return null
			}
		)

		if (!verified) {
			return res
				.status(401)
				.json({ msg: 'Token verification failed, authorization denied' })
		}

		//Refresh token and send to client
		// let newToken = await getAccessToken(verified.id)
		// res.setHeader("x-auth-token", newToken);

		req.userId = verified.userId
		req.userRole = verified.role
		next()
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

const adminAuth = async (req, res, next) => {
	try {
		const token = req.header('x-access-token')

		if (!token) {
			return res
				.status(403)
				.json({ msg: 'No authentication token, authorization denied' })
		}

		const verified = jwt.verify(
			token,
			process.env.JWT_SECRET,
			function (err, decoded) {
				if (!err) return decoded

				console.log('Error', err)

				return null
			}
		)

		if (!verified) {
			return res
				.status(401)
				.json({ msg: 'Token verification failed, authorization denied' })
		}

		if (verified.role == 'admin' || verified.role == 'owner') {
			const admin = await findUserByIdDb(verified.userId)
			if(!admin.is_active){
				return res
				.status(401)
				.json({ msg: 'Token verification failed, authorization denied' })
			}

			req.userId = verified.userId
			next()
		} else{
			return res.status(403).json({ msg: 'Not authrorized for request.' })
		}


		//Refresh token and send to client
		// let newToken = await getAccessToken(verified.id)
		// res.setHeader("x-auth-token", newToken);
		

	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

const ownerAuth = async (req, res, next) => {
	try {
		const token = req.header('x-access-token')

		if (!token) {
			return res
				.status(403)
				.json({ msg: 'No authentication token, authorization denied' })
		}

		const verified = jwt.verify(
			token,
			process.env.JWT_SECRET,
			function (err, decoded) {
				if (!err) return decoded

				console.log('Error', err)

				return null
			}
		)

		if (!verified) {
			return res
				.status(401)
				.json({ msg: 'Token verification failed, authorization denied' })
		}

		if (verified.role != 'owner') {
			return res.status(403).json({ msg: 'Not authrorized for request.' })
		}

		//Refresh token and send to client
		// let newToken = await getAccessToken(verified.id)
		// res.setHeader("x-auth-token", newToken);

		req.userId = verified.userId
		next()
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

module.exports = {
	auth,
	adminAuth,
	ownerAuth
}

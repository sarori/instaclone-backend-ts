import passport from "passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import User from "./entities/User"

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: "m5rI3DOEVX80ckuhNDffyhMNstmbdSiK",
}

const verifyUser = async (payload, done) => {
	try {
		const user = await User.findOne({ id: payload.id })
		if (user !== null) {
			return done(null, user)
		} else {
			return done(null, false)
		}
	} catch (err) {
		return done(err, false)
	}
}

export const authenticateJwt = (req, res, next) =>
	passport.authenticate("jwt", { session: false }, (error, user) => {
		if (user) {
			req.user = user
		}
		next()
	})(req, res, next)

passport.use(new Strategy(jwtOptions, verifyUser))
passport.initialize()

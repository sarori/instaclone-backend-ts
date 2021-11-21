import User from "../../../entities/User"
import jwt from "jsonwebtoken"
import { Resolvers } from "src/types/resolvers"
import { LoginMutationArgs, LoginResponse } from "../../../types/graph"

const resolver: Resolvers = {
	Mutation: {
		login: async (_, args: LoginMutationArgs): Promise<LoginResponse> => {
			const { username, password } = args

			try {
				const user = await User.findOne({ username })
				if (!user) {
					return {
						ok: false,
						error: "User not found",
						token: null,
					}
				}
				//password
				const pwd = user.password
				if (pwd !== password) {
					return {
						ok: false,
						error: "Password is not matched",
						token: null,
					}
				}
				const token = await jwt.sign({ id: user.id }, "m5rI3DOEVX80ckuhNDffyhMNstmbdSiK")
				return {
					ok: true,
					error: null,
					token,
				}
			} catch (err) {
				return {
					ok: false,
					error: err.message,
					token: null,
				}
			}
		},
	},
}

export default resolver

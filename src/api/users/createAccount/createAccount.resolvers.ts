import User from "../../../entities/User"
import { CreateAccountMutationArgs, createAccountResponse } from "src/types/graph"
import { Resolvers } from "src/types/resolvers"

const resolver: Resolvers = {
	Mutation: {
		createAccount: async (
			_,
			args: CreateAccountMutationArgs
		): Promise<createAccountResponse> => {
			const { username } = args
			try {
				const exist = await User.findOne({ username })
				if (exist) {
					return {
						ok: false,
						error: "this username is already taken",
					}
				}
				//password
				const user = await User.create({ ...args })
				if (!user) {
					return {
						ok: false,
						error: "Cannot create user",
					}
				} else {
					user.save()
					return {
						ok: true,
						error: null,
					}
				}
			} catch (error) {
				return {
					ok: false,
					error: error.message,
				}
			}
		},
	},
}

export default resolver

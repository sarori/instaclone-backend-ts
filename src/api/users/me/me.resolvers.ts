import decodeJWT from "../../../decodeJWT"
import { meResponse, MeQueryArgs } from "src/types/graph"
import { Resolvers } from "src/types/resolvers"

const resolver: Resolvers = {
	Query: {
		me: async (_, args: MeQueryArgs, { loggedInUser }): Promise<meResponse> => {
			try {
				const { token } = args
				const user = await decodeJWT(token)
				if (user) {
					return {
						ok: true,
						error: null,
						user,
					}
				}
				return {
					ok: false,
					error: null,
					user: null,
				}
			} catch (error) {
				return {
					ok: false,
					error: error.message,
					user: null,
				}
			}
		},
	},
}

export default resolver

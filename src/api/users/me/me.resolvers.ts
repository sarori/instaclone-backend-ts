import { meResponse } from "src/types/graph"
import { Resolvers } from "src/types/resolvers"

const resolver: Resolvers = {
	Query: {
		me: async (_, __, context): Promise<meResponse> => {
			console.log(context)
			try {
				return {
					ok: true,
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

import User from "../../../entities/User"
import { SeeUserQueryArgs, seeUserReponse } from "src/types/graph"
import { Resolvers } from "src/types/resolvers"

const resolver: Resolvers = {
	Query: {
		seeUser: async (_, args: SeeUserQueryArgs): Promise<seeUserReponse> => {
			const { id } = args
			try {
				const user = await User.findOne({ id })
				if (!user) {
					return {
						ok: false,
						error: "User cannot found",
						user: null,
					}
				} else {
					return {
						ok: true,
						error: null,
						user,
					}
				}
			} catch (error) {
				return { ok: false, error: error.message, user: null }
			}
		},
	},
}

export default resolver

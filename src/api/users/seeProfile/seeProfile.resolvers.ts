import User from "../../../entities/User"
import { Resolvers } from "src/types/resolvers"
import { SeeProfileQueryArgs, seeProfileResponse } from "src/types/graph"

const resolver: Resolvers = {
	Query: {
		seeProfile: async (_, args: SeeProfileQueryArgs): Promise<seeProfileResponse> => {
			try {
				const { username } = args
				const user = await User.findOne({ username })
				if (!user) {
					return {
						ok: false,
						error: "Username cannot found",
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

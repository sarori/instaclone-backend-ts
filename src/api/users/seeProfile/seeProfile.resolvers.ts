import User from "../../../entities/User"
import { Resolvers } from "../../../types/resolvers"
import { SeeProfileQueryArgs, seeProfileResponse } from "../../../types/graph"
import { getRepository } from "typeorm"

const resolver: Resolvers = {
	Query: {
		seeProfile: async (_, args: SeeProfileQueryArgs): Promise<seeProfileResponse> => {
			try {
				const { username } = args
				const userRepo = getRepository(User)
				const user = await userRepo.findOne({
					where: {
						username,
					},
					// relations: ["photos"],
				})
				console.log(user, username)
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

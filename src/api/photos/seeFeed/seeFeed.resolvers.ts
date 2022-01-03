import Photo from "../../../entities/Photo"
import { Resolvers } from "src/types/resolvers"
import { getRepository } from "typeorm"

const resolver: Resolvers = {
	Query: {
		seeFeed: async (_, __, { loggedInUser, protectedResolver }) => {
			// protectedResolver(loggedInUser)
			const photoRepo = getRepository(Photo)
			const feeds = await photoRepo.find({
				order: {
					createdAt: "DESC",
				},
				relations: ["user"],
			})
			return feeds
		},
	},
}
export default resolver

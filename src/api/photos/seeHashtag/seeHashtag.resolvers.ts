import Hashtag from "../../../entities/Hashtag"
import { Resolvers } from "src/types/resolvers"
import { getRepository } from "typeorm"

const resolver: Resolvers = {
	Query: {
		seeHashtag: async (_, { hashtag }) => {
			const hashtagRepo = getRepository(Hashtag)
			const founded = await hashtagRepo.findOne({
				where: { hashtag },
			})
			return founded
		},
	},
}

export default resolver

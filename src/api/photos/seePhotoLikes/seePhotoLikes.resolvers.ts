import User from "../../../entities/User"
import { Resolvers } from "src/types/resolvers"
import { getRepository } from "typeorm"
import Like from "../../../entities/Like"

const resolver: Resolvers = {
	Query: {
		seePhotoLikes: async (_, args): Promise<User[] | null> => {
			const { id } = args
			const likeRepo = getRepository(Like)
			const likes: Like[] | undefined = await likeRepo.find({
				where: {
					photoId: id,
				},
				relations: ["photo", "photo.user"],
			})
			if (likes) {
				return likes.map((like) => like.photo.user)
			} else {
				return null
			}
		},
	},
}

export default resolver

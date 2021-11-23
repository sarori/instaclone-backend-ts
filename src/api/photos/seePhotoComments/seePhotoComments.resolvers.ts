import Photo from "../../../entities/Photo"
import { SeePhotoCommentsQueryArgs } from "src/types/graph"
import { Resolvers } from "src/types/resolvers"
import { getRepository } from "typeorm"

const resolver: Resolvers = {
	Query: {
		seePhotoComments: async (_, args: SeePhotoCommentsQueryArgs): Promise<Photo[]> => {
			const { id, page } = args
			const photoRepo = getRepository(Photo)
			const founded = await photoRepo.find({
				where: {
					photoId: id,
				},
				take: 5,
				skip: (page - 1) * 5,
				order: {
					createdAt: "ASC",
				},
			})
			return founded
		},
	},
}

export default resolver

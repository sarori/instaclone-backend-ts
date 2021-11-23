import Photo from "../../..//entities/Photo"
import { SearchPhotosQueryArgs } from "src/types/graph"
import { Resolvers } from "src/types/resolvers"
import { getRepository, ILike } from "typeorm"

const resolver: Resolvers = {
	Query: {
		searchPhotos: async (_, args: SearchPhotosQueryArgs): Promise<Photo[]> => {
			const { keyword } = args
			const photoRepo = getRepository(Photo)
			const founded = await photoRepo.find({ caption: ILike(`%${keyword}%`) })
			return founded
		},
	},
}

export default resolver

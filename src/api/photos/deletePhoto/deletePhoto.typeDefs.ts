import Photo from "../../..//entities/Photo"
import { Resolvers } from "src/types/resolvers"
import { getRepository } from "typeorm"
import { DeletePhotoMutationArgs, MutationResponse } from "src/types/graph"

const resolver: Resolvers = {
	Mutation: {
		deletePhoto: async (
			_,
			args: DeletePhotoMutationArgs,
			{ protectedResolver, loggedInUser }
		): Promise<MutationResponse> => {
			const { id } = args
			// protectedResolver(loggedInUser)
			const photoRepo = getRepository(Photo)
			const selectedPhoto = await photoRepo.findOne({ where: { id } })
			if (selectedPhoto && selectedPhoto?.userId === loggedInUser.id) {
				await photoRepo.remove(selectedPhoto)
				return {
					ok: true,
					error: null,
					id,
				}
			} else {
				return {
					ok: false,
					error: "It's not your photo",
					id: null,
				}
			}
		},
	},
}

export default resolver

import Photo from "../../../entities/Photo"
import { getRepository } from "typeorm"
import { Resolvers } from "src/types/resolvers"
import { MutationResponse, ToggleLikeMutationArgs } from "src/types/graph"
import Like from "../../../entities/Like"

const resolver: Resolvers = {
	Mutation: {
		toggleLike: async (
			_,
			args: ToggleLikeMutationArgs,
			{ loggedInUser }
		): Promise<MutationResponse> => {
			const { id } = args
			const photoRepo = getRepository(Photo)
			const likeRepo = getRepository(Like)
			const selectedPhoto = await photoRepo.findOne({ where: { id } })
			if (!selectedPhoto) {
				return {
					ok: false,
					id: null,
					error: "Photo is not found",
				}
			}
			const selectedLike = await likeRepo.findOne({
				where: {
					photoId: id,
					userId: loggedInUser.id,
				},
			})
			if (selectedLike) {
				await likeRepo.remove(selectedLike)
				return {
					ok: true,
					error: null,
					id,
				}
			} else {
				const newLike = new Like()
				newLike.photo = selectedPhoto
				newLike.userId = loggedInUser.id
				await likeRepo.save(newLike)
				return {
					ok: true,
					error: null,
					id,
				}
			}
		},
	},
}

export default resolver

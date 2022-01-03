import Photo from "../../../entities/Photo"
import { CreateCommentMutationArgs, MutationResponse } from "src/types/graph"
import { Resolvers } from "src/types/resolvers"
import { getRepository } from "typeorm"
import Comment from "../../../entities/Comment"

const resolver: Resolvers = {
	Mutation: {
		createComment: async (
			_,
			args: CreateCommentMutationArgs,
			{ loggedInUser, protectedResolver }
		): Promise<MutationResponse> => {
			// protectedResolver(loggedInUser)
			const { id, payload } = args
			const photoRepo = getRepository(Photo)
			const selectedPhoto = await photoRepo.findOne({ where: { id } })
			if (!selectedPhoto) {
				return {
					ok: false,
					id: null,
					error: "Photo not found",
				}
			}
			const commentRepo = getRepository(Comment)
			const newComment = new Comment()
			newComment.payload = payload
			newComment.photo = selectedPhoto
			newComment.user = loggedInUser

			const savedComment = await commentRepo.save(newComment)
			return {
				ok: true,
				id: savedComment.id,
				error: null,
			}
		},
	},
}

export default resolver

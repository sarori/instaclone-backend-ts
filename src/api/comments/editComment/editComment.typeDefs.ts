import Comment from "../../../entities/Comment"
import { EditCommentMutationArgs, MutationResponse } from "src/types/graph"
import { Resolvers } from "src/types/resolvers"
import { getRepository } from "typeorm"

const resolver: Resolvers = {
	Mutation: {
		editComment: async (
			_,
			args: EditCommentMutationArgs,
			{ protectedResolver, loggedInUser }
		): Promise<MutationResponse> => {
			// protectedResolver(loggedInUser)
			const { id, payload } = args
			const commentRepo = getRepository(Comment)
			const selectedComment = await commentRepo.findOne({
				where: {
					id,
				},
				relations: ["user"],
			})
			if (!selectedComment) {
				return {
					ok: false,
					id: null,
					error: "Comment not found",
				}
			} else if (selectedComment.user.id !== loggedInUser.id) {
				return {
					ok: false,
					id: null,
					error: "Not authorized",
				}
			} else {
				selectedComment.payload = payload
				const savedComment = await commentRepo.save(selectedComment)
				return {
					ok: true,
					id: savedComment.id,
					error: null,
				}
			}
		},
	},
}

export default resolver

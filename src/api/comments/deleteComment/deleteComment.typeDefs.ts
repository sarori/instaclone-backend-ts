import Comment from "../../../entities/Comment"
import { DeleteCommentMutationArgs, MutationResponse } from "src/types/graph"
import { Resolvers } from "src/types/resolvers"
import { getRepository } from "typeorm"

const resolver: Resolvers = {
	Mutation: {
		deleteComment: async (
			_,
			args: DeleteCommentMutationArgs,
			{ protectedResolver, loggedInUser }
		): Promise<MutationResponse> => {
			// protectedResolver(loggedInUser)
			const { id } = args
			const commentRepo = getRepository(Comment)
			const selectedComment = await commentRepo.findOne({
				where: { id },
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
				await commentRepo.remove(selectedComment)
				return {
					ok: true,
					id: selectedComment.id,
					error: null,
				}
			}
		},
	},
}

export default resolver

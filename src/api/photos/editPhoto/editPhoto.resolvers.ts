import Photo from "../../../entities/Photo"
import { EditPhotoMutationArgs, MutationResponse } from "src/types/graph"
import { Resolvers } from "src/types/resolvers"
import { getRepository } from "typeorm"
import Hashtag from "../../../entities/Hashtag"
import { processHashtags } from "../uploadPhoto/photos.utils"

const resolver: Resolvers = {
	Mutation: {
		editPhoto: async (
			_,
			args: EditPhotoMutationArgs,
			{ protectedResolver, loggedInUser }
		): Promise<MutationResponse> => {
			const { id, caption } = args
			const photoRepo = getRepository(Photo)
			const oldPhoto = await photoRepo.findOne({
				where: {
					id,
					userId: loggedInUser.id,
				},
				relations: ["hashtag"],
			})
			if (!oldPhoto) {
				return {
					ok: false,
					error: "Photo not found",
					id: null,
				}
			} else {
				const prevValue: {
					caption: string
					hashtag: Hashtag | null
				} = {
					caption: oldPhoto.caption,
					hashtag: oldPhoto.hashtag,
				}
				oldPhoto.caption = caption || prevValue.caption
				// if (caption && caption !== oldPhoto.caption) {
				// 	let hashtagObj = processHashtags(caption)
				// 	const newHashtag = new Hashtag()
				// 	newHashtag.hashtag = hashtagObj[i].where
				// 	await hashtagRepo.save(newHashtag)
				// }
				await photoRepo.save(oldPhoto)
			}
		},
	},
}

export default resolver

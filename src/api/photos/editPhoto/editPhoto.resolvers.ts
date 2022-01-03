import Photo from "../../../entities/Photo"
import { EditPhotoMutationArgs, MutationResponse } from "src/types/graph"
import { Resolvers } from "src/types/resolvers"
import { getRepository } from "typeorm"
import Hashtag from "../../../entities/Hashtag"
import { processHashtags } from "../shared/photos.utils"

const resolver: Resolvers = {
	Mutation: {
		editPhoto: async (
			_,
			args: EditPhotoMutationArgs,
			{ protectedResolver, loggedInUser }
		): Promise<MutationResponse> => {
			const { id, caption } = args
			const photoRepo = getRepository(Photo)
			const hashtagRepo = getRepository(Hashtag)
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

				if (caption) {
					let proccessedHashtag = processHashtags(caption)[0].where.hashtag
					if (oldPhoto.hashtag?.hashtag === proccessedHashtag) {
						oldPhoto.hashtag = null
					} else {
						const newHashtag = new Hashtag()
						newHashtag.hashtag = proccessedHashtag
						const savedHashtag = await hashtagRepo.save(newHashtag)
						oldPhoto.hashtag = savedHashtag
					}
				}
				await photoRepo.save(oldPhoto)
				return {
					ok: true,
					id,
					error: null,
				}
			}
		},
	},
}

export default resolver

import { GraphQLUpload } from "graphql-upload"
import Photo from "../../../entities/Photo"
import { getRepository } from "typeorm"
import { processHashtags } from "../shared/photos.utils"
import { uploadToS3 } from "../../users/shared/shared.utils"
import Hashtag from "../../../entities/Hashtag"

const resolver = {
	Upload: GraphQLUpload,
	Mutation: {
		uploadPhoto: async (_, { file, caption }, { loggedInUser, protectedResolver }) => {
			let hashtagObj
			if (caption) {
				hashtagObj = processHashtags(caption)
				// protectedResolver(loggedInUser)
			}
			const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads")
			const photoRepo = getRepository(Photo)
			const hashtagRepo = getRepository(Hashtag)
			const photo = new Photo()

			for (let i = 0; i < hashtagObj.length; i++) {
				const founded = await hashtagRepo.findOne({
					where: { hashtag: hashtagObj[i].where },
				})
				if (founded) {
					photo.hashtag = founded
					break
				} else {
					const newHashtag = new Hashtag()
					newHashtag.hashtag = hashtagObj[i].where
					await hashtagRepo.save(newHashtag)
					break
				}
			}
			photo.caption = caption
			photo.file = fileUrl
			photo.user = loggedInUser
			await photoRepo.save(photo)
			return photo
		},
	},
}

export default resolver

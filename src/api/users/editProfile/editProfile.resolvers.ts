import User from "../../../entities/User"
import { Resolvers } from "src/types/resolvers"
import { EditProfileMutationArgs, editProfileResponse } from "../../../types/graph"

const resolver: Resolvers = {
	Mutation: {
		editProfile: async (
			_,
			args: EditProfileMutationArgs,
			{ request, isAuthenticated }
		): Promise<editProfileResponse> => {
			isAuthenticated(request)
			const { id, firstName, lastName, username, email, password: newPassword } = args
			try {
				const targetUser = await User.findOne({
					id,
				})
				if (!targetUser) {
					return {
						ok: false,
						error: "User Not found",
					}
				}
				if (firstName) {
					targetUser.firstName = firstName
				}
				if (lastName) {
					targetUser.lastName = lastName
				}
				if (username) {
					targetUser.username = username
				}
				if (email) {
					targetUser.email = email
				}
				if (newPassword) {
					targetUser.password = newPassword
				}
				targetUser.save()
				return {
					ok: true,
					error: null,
				}
			} catch (err) {
				return {
					ok: false,
					error: err.message,
				}
			}
		},
	},
}

export default resolver

export function protectedResolver(ourResolver) {
	return function (root: any, args: any, context: any, info: any) {
		if (!context.loggedInUser) {
			const query = info.operation.operation === "query"
			if (query) {
				return null
			} else {
				return {
					ok: false,
					error: "Please log in to perform this action.",
				}
			}
		}
		return ourResolver(root, args, context, info)
	}
}

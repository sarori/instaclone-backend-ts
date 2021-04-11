import { PubSub } from "apollo-server-express"
import { execute, subscribe } from "graphql"
import { Server } from "http"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { verifyJWT } from "./passport"
import schema from "./schema"

export const getSubscriptionServer = (server: Server, pubsub: PubSub) => {
	return new SubscriptionServer(
		{
			execute,
			subscribe,
			schema,
			onConnect: async (connectionParam) => {
				const token = connectionParam["bearer"]
				if (token) {
					const user = await verifyJWT(token)
					return { user, pubsub }
				}

				throw new Error("need to login properly")
			},
		},
		{
			server,
		}
	)
}

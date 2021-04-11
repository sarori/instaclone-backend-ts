import { ApolloServer, PubSub } from "apollo-server-express"
import express from "express"
import helmet from "helmet"
import passport from "passport"
import { createConnections } from "typeorm"
import decodeJWT from "./decodeJWT"
import schema from "./schema"
import { createServer } from "http"
import { getSubscriptionServer } from "./subscription"

const app = express()
const pubsub = new PubSub()

app.use(helmet())
app.use(passport.initialize())
app.use(decodeJWT)

const server = new ApolloServer({
	playground: true,
	schema,
	context: async ({ req }) => {
		return { req, pubsub }
	},
	subscriptions: {
		path: "/subscription",
	},
})

server.applyMiddleware({ app })
const connectDb = async (retries = 5) => {
	while (retries) {
		try {
			await createConnections()
			console.log("DB connected")
			break
		} catch (err) {
			console.log(err)
			retries -= 1
			console.log(`Reties left ${retries}`)
			await new Promise((res) => setTimeout(res, 5000))
		}
	}
}

const listen = async () => {
	await connectDb()
	const subscriptionServer = createServer(app)
	subscriptionServer.listen(4000, () => {
		getSubscriptionServer(subscriptionServer, pubsub)
		console.log("Server working")
	})
}

export default {
	getApp: () => app,
	listen,
}

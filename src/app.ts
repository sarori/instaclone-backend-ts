import { NextFunction, Response } from "express"
import helmet from "helmet"
import { GraphQLServer, PubSub } from "graphql-yoga"
import schema from "./schema"
import decodeJWT from "./decodeJWT"
import { authenticateJwt } from "./passport"
import { isAuthenticated } from "./auth"
import { graphqlUploadExpress } from "graphql-upload"

class App {
	public app: GraphQLServer
	public pubSub: any
	constructor() {
		this.pubSub = new PubSub()
		this.pubSub.ee.setMaxListeners(99)
		this.app = new GraphQLServer({
			schema,
			context: (req) => {
				const { connection: { context = null } = {} } = req
				return {
					request: req.request,
					pubsub: this.pubSub,
					context,
					isAuthenticated,
				}
			},
		})
		this.middleware()
	}
	private middleware = (): void => {
		this.app.express.use(helmet())
		this.app.express.use(authenticateJwt)
		this.app.express.use(this.jwt)
		this.app.express.use(graphqlUploadExpress())
	}
	private jwt = async (req, res: Response, next: NextFunction): Promise<void> => {
		const token = req.get("authorization")
		if (token) {
			const user = await decodeJWT(token)
			if (user) {
				req.user = user
			} else {
				req.user = undefined
			}
		}
		next()
	}
}

export default new App().app

import { makeExecutableSchema } from "graphql-tools"
import { mergeTypes, mergeResolvers, fileLoader } from "merge-graphql-schemas"
import path from "path"

const loadedTypes = fileLoader(path.join(__dirname, "./api/**/*.graphql"))
const loadedResolvers = fileLoader(path.join(__dirname, "./api/**/*.resolvers.ts"))
// const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`)
// const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`)

const typeDefs = mergeTypes(loadedTypes)
const resolvers = mergeResolvers(loadedResolvers)

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema

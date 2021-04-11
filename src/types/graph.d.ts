export const typeDefs = [
	"type createAccountResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  createAccount(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): createAccountResponse!\n}\n\ntype meResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  me: meResponse!\n  seeUser(id: Int!): seeUserReponse!\n}\n\ntype seeUserReponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: Int!\n  firstName: String!\n  lastName: String!\n  username: String!\n  password: String!\n  email: String!\n  createdAt: String!\n  updatedAt: String!\n}\n",
]
/* tslint:disable */

export interface Query {
	me: meResponse
	seeUser: seeUserReponse
}

export interface SeeUserQueryArgs {
	id: number
}

export interface meResponse {
	ok: boolean
	error: string | null
	user: User | null
}

export interface User {
	id: number
	firstName: string
	lastName: string
	username: string
	password: string
	email: string
	createdAt: string
	updatedAt: string
}

export interface seeUserReponse {
	ok: boolean
	error: string | null
	user: User | null
}

export interface Mutation {
	createAccount: createAccountResponse
}

export interface CreateAccountMutationArgs {
	firstName: string
	lastName: string
	username: string
	email: string
	password: string
}

export interface createAccountResponse {
	ok: boolean
	error: string | null
}

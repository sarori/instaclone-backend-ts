export const typeDefs = ["type Comment {\n  int: Int!\n  payload: String!\n  photoId: Int!\n  user: User!\n  photo: Photo!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype Hashtag {\n  id: Int!\n  hashtag: String!\n  totalPhotos: Int!\n  createdAt: String!\n  updatedAt: String!\n  photos: [Photo]\n}\n\ntype Like {\n  id: Int!\n  photoId: Int!\n  photo: Photo!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype MutationResponse {\n  ok: Boolean!\n  id: Int\n  error: String\n  ok: Boolean!\n  id: Int\n  error: String\n}\n\ntype Mutation {\n  deletePhoto(id: Int!): MutationResponse!\n  editPhoto(id: Int!, caption: String): MutationResponse!\n  uploadPhoto(file: Upload!, caption: String): Photo\n  createAccount(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): createAccountResponse!\n  editProfile(id: Int!, firstName: String, lastName: String, username: String, email: String, password: String): editProfileResponse!\n  login(username: String!, password: String!): LoginResponse!\n}\n\ntype Query {\n  searchPhotos(keyword: String!): [Photo]\n  seeFeed: [Photo]\n  seeHashtag(hashtag: String!): Hashtag\n  seePhotoComments(id: Int!, page: Int!): [Comment]\n  seePhotoLikes(id: Int!): [User]\n  me: meResponse!\n  seeProfile(username: String!): seeProfileResponse!\n  seeUser(id: Int!): seeUserReponse!\n}\n\ntype Photo {\n  id: Int!\n  user: User!\n  file: String!\n  caption: String\n  hashtag: Hashtag\n  createdAt: String!\n  updatedAt: String!\n  userId: Int!\n  hashtagId: Int\n  likesNumber: Int!\n  likes: [Like]\n  comments: [Comment]\n  commentNumber: Int!\n  isMine: Boolean!\n  isLiked: Boolean!\n}\n\nscalar Upload\n\ntype createAccountResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype editProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype LoginResponse {\n  ok: Boolean!\n  token: String\n  error: String\n}\n\ntype meResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype seeProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype seeUserReponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: Int!\n  firstName: String!\n  lastName: String!\n  username: String!\n  password: String!\n  email: String!\n  createdAt: String!\n  updatedAt: String!\n  bio: String\n  avatar: String\n}\n"];
/* tslint:disable */

export interface Query {
  searchPhotos: Array<Photo> | null;
  seeFeed: Array<Photo> | null;
  seeHashtag: Hashtag | null;
  seePhotoComments: Array<Comment> | null;
  seePhotoLikes: Array<User> | null;
  me: meResponse;
  seeProfile: seeProfileResponse;
  seeUser: seeUserReponse;
}

export interface SearchPhotosQueryArgs {
  keyword: string;
}

export interface SeeHashtagQueryArgs {
  hashtag: string;
}

export interface SeePhotoCommentsQueryArgs {
  id: number;
  page: number;
}

export interface SeePhotoLikesQueryArgs {
  id: number;
}

export interface SeeProfileQueryArgs {
  username: string;
}

export interface SeeUserQueryArgs {
  id: number;
}

export interface Photo {
  id: number;
  user: User;
  file: string;
  caption: string | null;
  hashtag: Hashtag | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  hashtagId: number | null;
  likesNumber: number;
  likes: Array<Like> | null;
  comments: Array<Comment> | null;
  commentNumber: number;
  isMine: boolean;
  isLiked: boolean;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  bio: string | null;
  avatar: string | null;
}

export interface Hashtag {
  id: number;
  hashtag: string;
  totalPhotos: number;
  createdAt: string;
  updatedAt: string;
  photos: Array<Photo> | null;
}

export interface Like {
  id: number;
  photoId: number;
  photo: Photo;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  int: number;
  payload: string;
  photoId: number;
  user: User;
  photo: Photo;
  createdAt: string;
  updatedAt: string;
}

export interface meResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface seeProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface seeUserReponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  deletePhoto: MutationResponse;
  editPhoto: MutationResponse;
  uploadPhoto: Photo | null;
  createAccount: createAccountResponse;
  editProfile: editProfileResponse;
  login: LoginResponse;
}

export interface DeletePhotoMutationArgs {
  id: number;
}

export interface EditPhotoMutationArgs {
  id: number;
  caption: string | null;
}

export interface UploadPhotoMutationArgs {
  file: Upload;
  caption: string | null;
}

export interface CreateAccountMutationArgs {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface EditProfileMutationArgs {
  id: number;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
}

export interface LoginMutationArgs {
  username: string;
  password: string;
}

export interface MutationResponse {
  ok: boolean;
  id: number | null;
  error: string | null;
}

export type Upload = any;

export interface createAccountResponse {
  ok: boolean;
  error: string | null;
}

export interface editProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface LoginResponse {
  ok: boolean;
  token: string | null;
  error: string | null;
}

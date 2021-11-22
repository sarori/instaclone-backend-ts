import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm"
import Comment from "./Comment"
import Hashtag from "./Hashtag"
import Like from "./Like"
import User from "./User"

@Entity()
class Photo extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@ManyToOne(() => User, (user) => user.photos, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userId", referencedColumnName: "id" })
	user: User

	@Column({ type: "numeric" })
	userId: number

	@Column({ type: "text" })
	file: string

	@Column({ type: "text" })
	caption: string

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string

	@Column({ type: "numeric", default: 0 })
	likesNumber: number

	@OneToMany(() => Like, (like) => like.photo, { nullable: true })
	likes: Like[] | null

	@OneToMany(() => Comment, (comment) => comment.photo, { nullable: true })
	comments: Comment[] | null

	@Column({ type: "numeric", default: 0 })
	commentNumber: number

	@Column({ type: "boolean", default: false })
	isMine: boolean

	@Column({ type: "boolean", default: false })
	isLiked: boolean

	@Column({ type: "numeric", nullable: true })
	hashtagId: number | null

	@ManyToOne(() => Hashtag, (hashtag) => hashtag.photos, { nullable: true })
	@JoinColumn({ name: "hashtagId", referencedColumnName: "id" })
	hashtag: Hashtag | null
}
export default Photo

// id: Int!
// user: User!
// file: String!
// caption: String
// hashtags: [Hashtag] -안함
// createdAt: String!
// updatedAt: String!
// likes: Int!
// commentNumber: Int!
// comments: [Comment] - 안함
// isMine: Boolean!
// isLiked: Boolean!

import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm"
import Photo from "./Photo"
import User from "./User"

@Entity()
class Comment extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: "text" })
	payload: string

	@Column({ type: "numeric" })
	photoId: number

	@Column(() => User)
	user: User

	@ManyToOne(() => Photo, (photo) => photo.comments, { onDelete: "CASCADE" })
	@JoinColumn({ name: "photoId", referencedColumnName: "id" })
	photo: Photo

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string
}

export default Comment

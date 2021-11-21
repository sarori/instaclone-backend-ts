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

@Entity()
class Like extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: "numeric" })
	photoId: number

	@ManyToOne(() => Photo, (photo) => photo.likes, { onDelete: "CASCADE" })
	@JoinColumn({ name: "photoId", referencedColumnName: "id" })
	photo: Photo

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string
}

export default Like

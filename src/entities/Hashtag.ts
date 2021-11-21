import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm"
import Photo from "./Photo"

@Entity()
class Hashtag extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: "text" })
	hashtag: string

	@Column({ type: "numeric" })
	totalPhotos: number

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string

	@OneToMany(() => Photo, (photo) => photo.hashtag, { nullable: true })
	photos: Photo[] | null
}

export default Hashtag

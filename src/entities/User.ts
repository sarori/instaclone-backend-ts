import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm"
import { IsEmail } from "class-validator"
import Photo from "./Photo"

@Entity()
class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: "text" })
	firstName: string

	@Column({ type: "text" })
	lastName: string

	@Column({ type: "text" })
	username: string

	@Column({ type: "text" })
	password: string

	@Column({ type: "text" })
	@IsEmail()
	email: string

	@OneToMany(() => Photo, (photo) => photo.user, { nullable: true })
	photos: Photo[] | null

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string
}

export default User

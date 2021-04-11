import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm"
import { IsEmail } from "class-validator"

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

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string
}

export default User

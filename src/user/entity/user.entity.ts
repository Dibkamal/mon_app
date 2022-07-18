import { PostEntity } from 'src/post/entity/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity({ name: 'user' })
export class UserEntity {
  	@PrimaryGeneratedColumn()
    id: number;

  	@Column({
		  unique: true
	  })
	name: string;

	@Column()
	password: string;

	@OneToMany(() => PostEntity, (post: PostEntity) => post.user)
	posts: PostEntity[]
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/post.create-dto';
import { PostEntity } from './entity/post.entity';

@Injectable()
export class PostService {
    constructor (
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
    ){}
    async createPost (user: UserEntity, post: CreatePostDto, file: Express.Multer.File): Promise<PostEntity> {
        return await this.postRepository.save({...post, imgUrl: `/static/postImages/${file.filename}`, user});
    }
    async findAllPost (): Promise<PostEntity[]>{
        return await this.postRepository.find();
    }
    async findLoginedAllPost (user: UserEntity): Promise<PostEntity[]>{
        return await this.postRepository.find({ user });
    }
    async findPost (postId: number): Promise<PostEntity>{
     
        return await this.postRepository.findOne({ id: postId }, { relations: ['user'] });
    }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import "reflect-metadata"
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host:'postgres',   //process.env.DATABASE_HOST,
            port: 5432,
            username: 'postgres',//process.env.DATABASE_USERNAME,
            password: 'kamal',//process.env.DATABASE_PASSWORD,
            database:'feedDB',// process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true,
            entities: ['dist/**/*.entity{.ts,.js}'],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/static'
        }),
        UserModule,
        AuthModule,
        PostModule,
    ],
})
export class AppModule {}

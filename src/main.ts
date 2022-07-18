import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap () {
    const app = await NestFactory.create(AppModule);
    const options = new DocumentBuilder()
        .setTitle('NestJS PostgreSQL example')
        .setDescription('API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    app.use(morgan('tiny'));
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, 
    }));
    await app.listen(3009);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API Docs')
    .setDescription('The first app API description')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('User')
    .addTag('Role')
    .addTag('Summary Transaction')
    .addTag('Customer')
    .addTag('Bank Account')
    .addTag('Transaction')
    .addTag('Payment')
    .addTag('Report')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}

bootstrap();

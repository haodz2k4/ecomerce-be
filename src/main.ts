import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  //Transform interceptor 
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  //Validations 
  app.useGlobalPipes(
    new ValidationPipe(
      {
        transform: true
      }
    )
  )

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  //cors
  app.enableCors({
    origin: configService.get('CORS_ORIGIN')
  })

  //Versioning
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
  const port = configService.get<string>('PORT');
  await app.listen(port);
}
bootstrap();

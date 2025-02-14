import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ValidationPipe, VersioningType } from '@nestjs/common';

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

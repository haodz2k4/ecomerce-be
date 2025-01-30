import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  //Transform interceptor 
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  const port = configService.get<string>('PORT');
  await app.listen(port);
}
bootstrap();

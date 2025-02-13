import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { v2 } from 'cloudinary';
import { CLOUDINARY } from 'src/constants/app.constant';
import { ConfigService } from '@nestjs/config';
@Module({

  providers: [CloudinaryService, {
    provide: CLOUDINARY,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return v2.config({
        cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
        api_key: configService.get<string>('CLOUDINARY_API_KEY'),
        api_secret: configService.get<string>('CLOUDINARY_API_SECRET')
      })
    }
  }],
  exports: [CloudinaryService]
})
export class CloudinaryModule {}

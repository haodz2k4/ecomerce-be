import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadSingleResDto } from './dto/upload-single-res.dto';
import { plainToInstance } from 'class-transformer';
import { UploadMultiResDto } from './dto/upload-multi-res.dto';

@Injectable()
export class UploadService {

    constructor(private readonly cloudinaryService: CloudinaryService) {}

    async uploadSingle(file: Express.Multer.File) :Promise<UploadSingleResDto> {
        const result = await this.cloudinaryService.uploadSingle(file);
        return plainToInstance(UploadSingleResDto, result);
    }

    async uploadMulti(files: Express.Multer.File[]) :Promise<UploadMultiResDto> {
        const results = await this.cloudinaryService.uploadMulti(files);
        return plainToInstance(UploadMultiResDto, {
            urls: results
        })
    }
}

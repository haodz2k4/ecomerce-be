import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadSingleResDto } from './dto/upload-single-res.dto';
import { UploadMultiResDto } from './dto/upload-multi-res.dto';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingle(@UploadedFile() file: Express.Multer.File) :Promise<UploadSingleResDto> {
    return this.uploadService.uploadSingle(file);
  }

  @Post('multi')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMulti(@UploadedFiles() files: Array<Express.Multer.File>) :Promise<UploadMultiResDto> {
    return this.uploadService.uploadMulti(files)
  }
}

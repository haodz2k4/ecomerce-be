import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from "buffer-to-stream";
@Injectable()
export class CloudinaryService {

    async uploadSingle( file: Express.Multer.File ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        
            toStream(file.buffer).pipe(upload);
        });
    }

    async uploadMulti(file: Express.Multer.File[]) :Promise<(UploadApiResponse | UploadApiErrorResponse)[]> {
        return await Promise.all(file.map((item) => this.uploadSingle(item)))
    }
}
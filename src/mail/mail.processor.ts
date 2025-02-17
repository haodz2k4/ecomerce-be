import { MailerService } from "@nestjs-modules/mailer";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Job } from "bullmq";
import { JobEnum } from "src/constants/job.enum";


@Processor('mail')  
@Injectable()
export class MailProcessor extends WorkerHost {

    constructor(private mailerService: MailerService) {
        super()
    }
    async process(job: Job): Promise<void> {
        const data = job.data;
        try {
            switch(job.name) {
                case JobEnum.SEND_VERIFY_EMAIL:
                     await this.mailerService.sendMail(data);
                     break;
                case JobEnum.SEND_OTP: 
                    await this.mailerService.sendMail(data)
                    break;
                default:
                    throw new Error("Job name is invalid")
            }
        } catch(error) {
            throw new BadRequestException("Unable to send message: ", error)
        }
    }
    
}
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { CaslModule } from 'src/casl/casl.module';
import * as nodemailer from 'nodemailer';

@Module({
  imports: [CaslModule],
  providers: [
    EmailService,
    {
      provide: 'MAIL_TRANSPORT',  // Nome fixo para o provedor
      useFactory: () => {
        return nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
      },
    },
  ],
  exports: [EmailService],  
})
export class EmailModule {}

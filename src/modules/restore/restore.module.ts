import { Module } from '@nestjs/common';
import { RestoreService } from './restore.service';
import { RestoreController } from './restore.controller';
import { PrismaService } from 'src/database/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.MAIL_TRANSPORT,
        defaults: {
          from: '"TodoList" <ppedoros@gmail.com>',
        },
        template: {
          dir: __dirname + '/../../../src/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [RestoreService, PrismaService],
  controllers: [RestoreController]
})
export class RestoreModule {}

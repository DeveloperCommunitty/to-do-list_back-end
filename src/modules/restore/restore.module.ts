import { Module } from '@nestjs/common';
import { RestoreService } from './restore.service';
import { RestoreController } from './restore.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CaslModule } from 'src/casl/casl.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [CaslModule, EmailModule],
  providers: [RestoreService, PrismaService],
  controllers: [RestoreController],
})
export class RestoreModule {}

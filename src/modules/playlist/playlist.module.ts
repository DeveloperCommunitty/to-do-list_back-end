import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [CaslModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PrismaService],
})
export class PlaylistModule {}

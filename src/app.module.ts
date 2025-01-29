import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { RestoreModule } from './modules/restore/restore.module';
import { PlaylistModule } from './modules/playlist/playlist.module';

@Module({
  imports: [TaskModule, RestoreModule, PlaylistModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

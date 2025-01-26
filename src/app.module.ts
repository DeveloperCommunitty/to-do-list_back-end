import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task/task.module';
import { PlaylistModule } from './modules/playlist/playlist.module';

@Module({
  imports: [TaskModule,PlaylistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

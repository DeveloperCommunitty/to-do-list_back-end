import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task/task.module';
import { RestoreModule } from './modules/restore/restore.module';

@Module({
  imports: [TaskModule, RestoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

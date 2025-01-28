import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TaskModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

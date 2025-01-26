import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [TaskModule, RestoreModule,PlaylistModule],
  controllers: [AppController],
=======
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';

@Module({
  imports: [TaskModule, UserModule],
  controllers: [AppController, UserController],
>>>>>>> f646054a27cf3ecb5817a31d8872c59e2ffa2060
  providers: [AppService],
})
export class AppModule {}

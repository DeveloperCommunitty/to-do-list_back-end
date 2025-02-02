import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { RestoreModule } from './modules/restore/restore.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { CaslModule } from './casl/casl.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    TaskModule,
    RestoreModule,
    PlaylistModule,
    UserModule,
    AuthModule,
    CaslModule,
    EmailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

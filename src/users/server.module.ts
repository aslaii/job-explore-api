import { Module } from '@nestjs/common';
import { DatabaseModule } from './../shared/database.module';
import { SharedModule } from '../shared/shared.module';
import { User } from './../users/entities/user.entity';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [SharedModule, DatabaseModule.forRoot([User]), AuthModule],
})
export class UsersServerModule {}

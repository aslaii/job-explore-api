import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './../users/users.module';
import { IsExist } from './../common/utils/validators/is-exists.validator';
import { IsNotExist } from './../common/utils/validators/is-not-exists.validator';
import { SharedModule } from './../shared/shared.module';

@Module({
  imports: [UsersModule, PassportModule, SharedModule],
  controllers: [AuthController],
  providers: [IsExist, IsNotExist, AuthService],
  exports: [AuthService],
})
export class AuthModule {}

// auth/dto/auth-register-login.dto.ts
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotExist } from './../../common/utils/validators/is-not-exists.validator';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'johndoe' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsNotExist, ['User'], {
    message: 'userLoginAlreadyExists',
  })
  userLogin: string;

  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  displayName: string;
}

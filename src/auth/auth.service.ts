// /src/auth/auth.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
  ): Promise<{ accessToken: string; user: User }> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
    });
    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (isValidPassword) {
      const accessToken = this.jwtService.sign({
        id: user.id,
        email: user.email,
      });
      return { accessToken, user };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    await this.usersService.create({
      userLogin: dto.userLogin,
      email: dto.email,
      password: dto.password,
      displayName: dto.displayName,
    });
  }

  async buildAccessToken(id: number) {
    const user = await this.usersService.findOne({
      id,
    });

    return this.jwtService.sign({
      id: user.id,
      sub: user.id.toString(),
      email: user.email,
    });
  }

  async me(user: User): Promise<User> {
    return this.usersService.findOne({
      id: user.id,
    });
  }
}

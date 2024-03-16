import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserAccount } from '@family-coffee/entities';
import { AuthService } from './auth.service';
import { LoginAccountDto } from './dto/login-account.dto';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: CreateAccountDto })
  @ApiResponse({ status: 200, description: 'Registered successfully' })
  async registerAdmin(
    @Body() createAccountDto: CreateAccountDto
  ): Promise<UserAccount> {
    return await this.authService.register(createAccountDto);
  }

  @Post('login')
  @ApiBody({ type: LoginAccountDto })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid phone number or password' })
  async loginAdmin(
    @Body() loginAccountDto: LoginAccountDto
  ): Promise<UserAccount> {
    const admin = await this.authService.login(loginAccountDto);
    if (!admin) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED
      );
    }
    return admin;
  }
}

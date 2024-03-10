import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminAccount } from '@family-coffee/entities';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginAccountDto } from './dto/login-account.dto';

@ApiTags('Authencation')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: CreateAccountDto })
  @ApiResponse({ status: 200, description: 'Registered successfully' })
  async registerAdmin(
    @Body() createAccountDto: CreateAccountDto
  ): Promise<AdminAccount> {
    return await this.authService.register(createAccountDto);
  }

  @Post('login')
  @ApiBody({ type: LoginAccountDto })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid phone number or password' })
  async loginAdmin(
    @Body() loginAccountDto: LoginAccountDto
  ): Promise<AdminAccount> {
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

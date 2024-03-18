import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionService } from '@family-coffee/services';
import { AdminAccount, UserAccount } from '@family-coffee/entities';

import { LoginAccountDto } from './dto/login-account.dto';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserAccount)
    private readonly userAccountRepo: Repository<UserAccount>,
    private readonly httpExceptionService: HttpExceptionService
  ) {}

  async register(createUserDto: CreateAccountDto): Promise<UserAccount> {
    const hashedPassword = this.hashPassword(createUserDto.password); // Mã hoá mật khẩu

    try {
      const token = this.jwtService.sign({
        phone_number: createUserDto.phone_number,
        password: hashedPassword,
      });

      const user = new AdminAccount();
      user.email = createUserDto.email;
      user.password = hashedPassword; // Sử dụng mật khẩu đã mã hoá
      user.fullName = createUserDto.full_name;
      user.address = createUserDto.address;
      user.phoneNumber = createUserDto.phone_number;
      user.jwtToken = token;

      return await this.userAccountRepo.save(user);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async login(loginUserDto: LoginAccountDto): Promise<AdminAccount | null> {
    const { phone_number, password } = loginUserDto;

    try {
      const user = await this.userAccountRepo.findOne({
        where: { phoneNumber: phone_number },
      });

      if (!user || user.password !== password) {
        throw this.httpExceptionService.unAuthorizedRequests(
          'Invalid phone number or password'
        );
      }

      const isValidPassword = user.password === this.hashPassword(password); // So sánh mật khẩu đã mã hoá

      if (!isValidPassword) {
        return null;
      }

      const token = this.jwtService.sign({
        phone_number: user.phoneNumber,
        password: this.hashPassword(password),
      });

      user.jwtToken = token;
      await this.userAccountRepo.save(user);

      return user;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}

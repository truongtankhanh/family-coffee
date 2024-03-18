import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminAccount } from '@family-coffee/entities';
import { HttpExceptionService } from '@family-coffee/services';
import { LoginAccountDto } from './dto/login-account.dto';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(AdminAccount)
    private readonly adminAccountRepo: Repository<AdminAccount>,
    private readonly httpExceptionService: HttpExceptionService
  ) {}

  async register(createAccountDto: CreateAccountDto): Promise<AdminAccount> {
    const hashedPassword = this.hashPassword(createAccountDto.password); // Mã hoá mật khẩu

    try {
      const token = this.jwtService.sign({
        phone_number: createAccountDto.phone_number,
        password: hashedPassword,
      });

      const account = new AdminAccount();
      account.email = createAccountDto.email;
      account.password = hashedPassword; // Sử dụng mật khẩu đã mã hoá
      account.fullName = createAccountDto.full_name;
      account.address = createAccountDto.address;
      account.phoneNumber = createAccountDto.phone_number;
      account.jwtToken = token;

      return await this.adminAccountRepo.save(account);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async login(loginAccountDto: LoginAccountDto): Promise<AdminAccount | null> {
    const { phone_number, password } = loginAccountDto;

    try {
      const admin = await this.adminAccountRepo.findOne({
        where: { phoneNumber: phone_number },
      });

      if (!admin || admin.password !== password) {
        throw this.httpExceptionService.unAuthorizedRequests('Invalid phone number or password')
      }

      const isValidPassword = admin.password === this.hashPassword(password); // So sánh mật khẩu đã mã hoá

      if (!isValidPassword) {
        return null;
      }

      const token = this.jwtService.sign({
        phone_number: admin.phoneNumber,
        password: this.hashPassword(password),
      });

      admin.jwtToken = token;
      await this.adminAccountRepo.save(admin);

      return admin;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}

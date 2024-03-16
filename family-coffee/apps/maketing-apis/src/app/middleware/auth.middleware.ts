import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccount } from '@family-coffee/entities';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserAccount)
    private readonly userAccountRepo: Repository<UserAccount>
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const user = await this.userAccountRepo.findOne({
          where: { jwtToken: token },
        });
        if (user) {
          next();
        }
      } catch (error) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          status: HttpStatus.UNAUTHORIZED,
          time: new Date().toLocaleString(),
          path: req.originalUrl,
          message: 'Unauthorized',
        });
      }
    }

    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      time: new Date().toLocaleString(),
      path: req.originalUrl,
      message: 'Unauthorized',
    });
  }
}

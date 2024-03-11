import { AppDataSource } from '@family-coffee/config';
import { AdminAccount } from '@family-coffee/entities';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly adminAccountRepo = AppDataSource.getRepository(AdminAccount);

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const admin = await this.adminAccountRepo.findOne({
          where: { jwtToken: token },
        });
        if (admin) {
          next();
        }
      } catch (error) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({
            status: HttpStatus.UNAUTHORIZED,
            time: new Date().toLocaleString(),
            path: req.originalUrl,
            message: 'Unauthorized',
          });
      }
    }

    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({
        status: HttpStatus.UNAUTHORIZED,
        time: new Date().toLocaleString(),
        path: req.originalUrl,
        message: 'Unauthorized',
      });
  }
}

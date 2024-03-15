import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { typeormConfig } from '@family-coffee/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  AdminAccount,
  Category,
  Customer,
  Order,
  Payment,
  Product,
} from '@family-coffee/entities';

import {
  AuthModule,
  CategoryModule,
  ProductModule,
  OrderModule,
  CustomerModule,
  PaymentModule,
} from './modules';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { HttpExceptionFilter } from './filters';
import { ResponseFormattingInterceptor } from './interceptors';
import { AuthMiddleware, LoggingMiddleware } from './middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' },
    }),
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([
      AdminAccount,
      Category,
      Product,
      Order,
      Customer,
      Payment,
    ]),
    AuthModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    CustomerModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormattingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware, AuthMiddleware).forRoutes('*');
  }
}

import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import {
  AuthModule,
  CategoryModule,
  ProductModule,
  OrderModule,
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
    AuthModule,
    CategoryModule,
    ProductModule,
    OrderModule,
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

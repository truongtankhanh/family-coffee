import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { typeormConfig } from '@family-coffee/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthModule, BlogPostModule } from './modules';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { HttpExceptionFilter } from './filters';
import { LoggingMiddleware } from './middleware';
import { ResponseFormattingInterceptor } from './interceptors';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' },
    }),
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    BlogPostModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormattingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

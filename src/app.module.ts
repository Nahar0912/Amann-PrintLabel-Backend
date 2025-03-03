import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelModule } from './label/label.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    LabelModule, ArticleModule, UserModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT), 
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      // synchronize: true,
      synchronize: process.env.NODE_ENV !== 'production',
      extra: {
        trustServerCertificate: true, 
        encrypt: true, 
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
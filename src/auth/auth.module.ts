import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        // signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

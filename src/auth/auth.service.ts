import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Generate a JWT token
  async generateToken(user: UserEntity): Promise<string> {
    const payload:JwtPayload = { email: user.Email, sub: user.Id };  
    return this.jwtService.sign(payload);
  }
}

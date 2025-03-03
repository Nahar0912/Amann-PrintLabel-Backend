import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies['access_token']; 
      },
      ignoreExpiration: false, 
      secretOrKey: process.env.JWT_SECRET, 
    });
  }

  // Validate the JWT payload and user
  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}

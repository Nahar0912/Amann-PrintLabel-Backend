import { Controller, Post, Body, BadRequestException, Res, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  async login(@Body() userDto: UserDto, @Res() res: Response) {
    const { Email, PasswordHash } = userDto;

    // Check if the user exists
    const user = await this.userService.findByEmail(Email);
    if (!user) {
      throw new BadRequestException('Invalid User credentials');
    }

    // Validate password
    const isPasswordValid = await this.userService.validatePassword(PasswordHash, user.PasswordHash);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Password credentials');
    }

    // Generate JWT token
    const token = await this.authService.generateToken(user);

    // Set the token as an HTTP-only cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      // maxAge: 3600000, // 1 hour
    });

    return res.json({ message: 'Login successful' });
  }

  @Post('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.json({ message: 'Logged out successfully' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/check')
  checkAuth(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies['access_token'];

    if (!token) {
      throw new UnauthorizedException('User is not authenticated');
    }

    return res.json({ message: 'User is authenticated' });
  }
}

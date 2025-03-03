import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Health check endpoint
  @Get('/index')
  getIndex(): string {
    return this.userService.getIndex();
  }

  // Get all users
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  // Get a user by ID
  @Get('/:id')
  async findOneById(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOneById(id);
  }

  // Find a user by email
  @Get('/email/:email')
  async findByEmail(@Param('email') email: string): Promise<UserEntity> {
    return this.userService.findByEmail(email);
  }

  // Create a new user
  @Post('/add')
  async create(@Body() userDto: UserDto): Promise<UserEntity> {
    return this.userService.create(userDto);
  }

  // Update a user by ID
  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto);
  }

  // Delete a user by ID
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.userService.delete(id);
    return { message: `User with ID ${id} successfully deleted` };
  }
}

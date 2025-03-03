import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'; 
import { UserEntity } from './user.entity';
import { UpdateUserDto, UserDto } from './user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Health check method
  getIndex(): string {
    return 'User Service is running';
  }

  // Get all users
  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users.map(user => plainToClass(UserEntity, user)); 
  }

  // Get a user by ID
  async findOneById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { Id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Find a user by email (used for login)
  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { Email: email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Validate password by comparing plain text password with hashed password
  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Create a new user
  async create(userDto: UserDto): Promise<UserEntity> {
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(userDto.PasswordHash, salt);

    const user = this.userRepository.create({
      ...userDto,
      PasswordHash: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  // Update a user by ID
  async update(id: number, userDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOneById(id);
    Object.assign(user, userDto);

    // If the password is provided, hash it and update
    if (userDto.PasswordHash) {
      const salt = await bcrypt.genSalt(10); 
      user.PasswordHash = await bcrypt.hash(userDto.PasswordHash, salt);
    }

    return this.userRepository.save(user);
  }

  // Delete a user by ID
  async delete(id: number): Promise<void> {
    const user = await this.findOneById(id);
    await this.userRepository.remove(user);
  }

  // Method to check if a user is active (optional based on your requirement)
  async isActive(id: number): Promise<boolean> {
    const user = await this.findOneById(id);
    return user.isActive;
  }
}

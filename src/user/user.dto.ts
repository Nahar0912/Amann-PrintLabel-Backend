import { IsString, IsEmail, MinLength, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  Username: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  PasswordHash: string;

  @IsString()
  @IsNotEmpty()
  Role: string;

  @IsBoolean()
  @IsOptional() 
  isActive: boolean;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  Username?: string;

  @IsEmail()
  @IsOptional()
  Email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  PasswordHash?: string;

  @IsString()
  @IsOptional()
  Role?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

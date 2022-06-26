import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Role } from '../../@core/domain/users/user.entity';

export class CreateUserDTO {
  @IsString()
  @ApiProperty({ required: true })
  public readonly name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ required: true })
  public readonly email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly avatar?: string | undefined;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true })
  public readonly phone: string;

  @IsArray()
  @IsEnum(Role, { each: true })
  @ApiProperty({ required: true, enum: Role })
  public readonly roles: Role[];

  @IsString()
  @ApiProperty({ required: true })
  public readonly password: string;
}

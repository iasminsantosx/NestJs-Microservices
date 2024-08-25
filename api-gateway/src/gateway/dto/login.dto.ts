import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email para logar', example: 'john.doe' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha para logar', example: 'StrongPassword123!' })
  @IsString()
  @IsNotEmpty()
  senha: string;
}
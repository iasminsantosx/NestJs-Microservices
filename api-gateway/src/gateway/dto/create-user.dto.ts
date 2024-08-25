import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome completo do usuário', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Email do usuário', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'StrongPassword123!' })
  @IsString()
  @IsNotEmpty()
  senha: string;
}

import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    nome: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    senha: string;
}

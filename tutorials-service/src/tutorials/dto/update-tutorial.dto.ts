import { IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateTutorialDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsDate()
  data?: Date;
}

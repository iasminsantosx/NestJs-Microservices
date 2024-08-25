import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateTutorialDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsDate()
  data: Date;
}

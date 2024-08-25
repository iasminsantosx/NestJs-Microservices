import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateTutorialDto {
  @ApiProperty({
    description: 'Título do tutorial',
    example: 'Introdução ao NestJS',
  })
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty({
    description: 'Descrição do tutorial',
    example: 'Este tutorial é uma introdução ao framework NestJS.',
  })
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @ApiProperty({
    description: 'Data do tutorial',
    example: '2024-08-25T00:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  data: Date;
}

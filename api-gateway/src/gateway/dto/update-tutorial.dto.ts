import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateTutorialDto {
  @ApiProperty({
    description: 'Título do tutorial',
    example: 'Introdução ao NestJS',
    required: false, 
  })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({
    description: 'Descrição do tutorial',
    example: 'Este tutorial é uma introdução ao framework NestJS.',
    required: false, 
  })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({
    description: 'Data do tutorial',
    example: '2024-08-25T00:00:00Z',
    required: false, 
  })
  @IsOptional()
  @IsDateString()
  data?: Date;
}

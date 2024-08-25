import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tutorial } from './entities/tutorial.entity';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';

@Injectable()
export class TutorialsService {
  constructor(
    @InjectRepository(Tutorial)
    private tutorialsRepository: Repository<Tutorial>,
  ) {}

  async findAll(titulo?: string, data?: Date): Promise<Tutorial[]> {
    try {
      const query = this.tutorialsRepository.createQueryBuilder('tutorial');
      if (titulo) {
        query.andWhere('tutorial.titulo LIKE :titulo', { titulo: `%${titulo}%` });
      }
      if (data) {
        query.andWhere('tutorial.data = :date', { date: data });
      }
      return await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException('Erro interno ao buscar tutoriais.');
    }
  }

  async create(createTutorialDto: CreateTutorialDto): Promise<Tutorial> {
    try {
      const tutorial = this.tutorialsRepository.create(createTutorialDto);
      return await this.tutorialsRepository.save(tutorial);
    } catch (error) {
      throw new InternalServerErrorException('Erro interno ao criar o tutorial.');
    }
  }

  async update(id: number, updateTutorialDto: UpdateTutorialDto): Promise<Tutorial> {
    try {
      const result = await this.tutorialsRepository.update(id, updateTutorialDto);
      if (result.affected === 0) {
        throw new NotFoundException('Tutorial não encontrado.');
      }
      return await this.tutorialsRepository.findOneBy({ id });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro interno ao atualizar o tutorial.');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.tutorialsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Tutorial não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro interno ao remover o tutorial.');
    }
  }
}

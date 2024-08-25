import { Injectable } from '@nestjs/common';
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
    const query = this.tutorialsRepository.createQueryBuilder('tutorial');
    if (titulo) {
      query.andWhere('tutorial.titulo LIKE :titulo', { titulo: `%${titulo}%` });
    }
    if (data) {
      query.andWhere('tutorial.data= :date', { data });
    }
    return query.getMany();
  }

  async create(createTutorialDto: CreateTutorialDto): Promise<Tutorial> {
    const tutorial = this.tutorialsRepository.create(createTutorialDto);
    return this.tutorialsRepository.save(tutorial);
  }

  async update(id: number, updateTutorialDto: UpdateTutorialDto): Promise<Tutorial> {
    await this.tutorialsRepository.update(id, updateTutorialDto);
    return this.tutorialsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tutorialsRepository.delete(id);
  }
}

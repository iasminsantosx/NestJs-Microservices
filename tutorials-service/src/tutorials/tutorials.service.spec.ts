import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TutorialsService } from './tutorials.service';
import { Tutorial } from './entities/tutorial.entity';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';

describe('TutorialsService', () => {
  let service: TutorialsService;
  let repository: Repository<Tutorial>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TutorialsService,
        {
          provide: getRepositoryToken(Tutorial),
          useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<TutorialsService>(TutorialsService);
    repository = module.get<Repository<Tutorial>>(getRepositoryToken(Tutorial));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tutorials', async () => {
      const tutorials: Tutorial[] = [
        { id: 1, titulo: 'Tutorial 1', descricao: 'Desc 1', data: new Date() },
        { id: 2, titulo: 'Tutorial 2', descricao: 'Desc 2', data: new Date() },
      ];
      jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => ({
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(tutorials),
      }) as any);

      expect(await service.findAll()).toEqual(tutorials);
    });
  });

  describe('create', () => {
    it('should successfully insert a tutorial', async () => {
      const dto: CreateTutorialDto = { titulo: 'New Tutorial', descricao: 'Desc', data: new Date() };
      const tutorial: Tutorial = { id: 1, ...dto };

      jest.spyOn(repository, 'create').mockReturnValue(tutorial);
      jest.spyOn(repository, 'save').mockResolvedValue(tutorial);

      expect(await service.create(dto)).toEqual(tutorial);
    });
  });

  describe('update', () => {
    it('should update a tutorial', async () => {
      const dto: UpdateTutorialDto = { titulo: 'Updated Tutorial', descricao: 'Updated Desc' };
      const tutorial: Tutorial = { id: 1, titulo: 'Old Tutorial', descricao: 'Old Desc', data: new Date() };

      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(repository, 'findOneBy').mockResolvedValue({ ...tutorial, ...dto });

      expect(await service.update(1, dto)).toEqual({ ...tutorial, ...dto });
    });
  });

  describe('remove', () => {
    it('should remove a tutorial', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});

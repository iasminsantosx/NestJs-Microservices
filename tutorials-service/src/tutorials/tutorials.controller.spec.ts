import { Test, TestingModule } from '@nestjs/testing';
import { TutorialsController } from './tutorials.controller';
import { TutorialsService } from './tutorials.service';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';

describe('TutorialsController', () => {
  let controller: TutorialsController;
  let service: TutorialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutorialsController],
      providers: [
        {
          provide: TutorialsService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TutorialsController>(TutorialsController);
    service = module.get<TutorialsService>(TutorialsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll with the correct parameters', async () => {
      const titulo = 'Sample Title';
      const data = new Date();
      await controller.findAll(titulo, data);
      expect(service.findAll).toHaveBeenCalledWith(titulo, data);
    });
  });

  describe('create', () => {
    it('should call create with the correct DTO', async () => {
      const dto: CreateTutorialDto = { titulo: 'New Tutorial', descricao: 'Descricao' , data: new Date()};
      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should call update with the correct parameters', async () => {
      const id = 1;
      const dto: UpdateTutorialDto = { titulo: 'Updated Tutorial', descricao: 'Updated descricao' };
      await controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should call remove with the correct id', async () => {
      const id = 1;
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});

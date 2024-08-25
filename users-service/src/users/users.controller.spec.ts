import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn((dto: CreateUserDto) => ({
      id: '123',
      ...dto,
    })),
    login: jest.fn((dto: LoginDto) => ({
      token: 'test-token',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { nome: 'John', email: 'john@example.com', senha: 'password' };
      const result = await controller.create(createUserDto);

      expect(result).toEqual({
        id: '123',
        ...createUserDto,
      });
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should return a token', async () => {
      const loginDto: LoginDto = { email: 'john@example.com', senha: 'password' };
      const result = await controller.login(loginDto);

      expect(result).toEqual({
        token: 'test-token',
      });
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });
});

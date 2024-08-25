import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(() => 'test-access-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('create', () => {
    it('should successfully create a new user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        nome: 'Test User',
        senha: 'password',
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(createUserDto as User);
      mockUserRepository.save.mockResolvedValue(createUserDto as User);

      const result = await service.create(createUserDto);

      expect(result).toEqual(createUserDto);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email: createUserDto.email } });
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        email: createUserDto.email,
        nome: createUserDto.nome,
        senha: expect.any(String), // Check that the password is hashed
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(result);
    });

    it('should throw a ConflictException if email already exists', async () => {
      const createUserDto = {
        email: 'test@example.com',
        nome: 'Test User',
        senha: 'password',
      };

      mockUserRepository.findOne.mockResolvedValue(createUserDto as User);

      await expect(service.create(createUserDto)).rejects.toThrow(ConflictException);
    });

    it('should throw an InternalServerErrorException on save error', async () => {
      const createUserDto = {
        email: 'test@example.com',
        nome: 'Test User',
        senha: 'password',
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(createUserDto as User);
      mockUserRepository.save.mockRejectedValue(new Error());

      await expect(service.create(createUserDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('login', () => {
    it('should successfully return an access token', async () => {
      const loginDto = {
        email: 'test@example.com',
        senha: 'password',
      };

      const user = {
        email: 'test@example.com',
        senha: await bcrypt.hash('password', await bcrypt.genSalt()),
        id: 'user-id',
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.login(loginDto);

      expect(result).toEqual({ accessToken: 'test-access-token' });
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email: loginDto.email } });
      expect(jwtService.sign).toHaveBeenCalledWith({ email: user.email, sub: user.id });
    });

    it('should throw a ConflictException if user not found', async () => {
      const loginDto = {
        email: 'test@example.com',
        senha: 'password',
      };

      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(ConflictException);
    });

    it('should throw a ConflictException if password is incorrect', async () => {
      const loginDto = {
        email: 'test@example.com',
        senha: 'password',
      };

      const user = {
        email: 'test@example.com',
        senha: await bcrypt.hash('different-password', await bcrypt.genSalt()),
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(ConflictException);
    });
  });
});

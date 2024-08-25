import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, nome, senha } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email já cadastrado.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(senha, salt);

    const user = this.userRepository.create({
      email,
      nome,
      senha: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    try {
      const { email, senha } = loginDto;
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new ConflictException('E-mail e/ou senha inválido(s).');
      }

      const passwordMatches = await bcrypt.compare(senha, user.senha);

      if (!passwordMatches) {
        throw new ConflictException('E-mail e/ou senha inválido(s).');
      }

      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };

    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

}

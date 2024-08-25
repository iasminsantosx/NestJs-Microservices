import { Controller, Post, Body, Get, Query, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API')
@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('user/signup')
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.gatewayService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(error.response?.data?.message || 'Erro interno do servidor', error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('user/login')
  @ApiOperation({ summary: 'Fazer login do usuário e retornar um token de acesso' })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido', schema: { example: { accessToken: 'string' } } })
  @ApiResponse({ status: 409, description: 'E-mail e/ou senha inválido(s).' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async loginUser(@Body() loginDto: LoginDto) {
    try {
      return await this.gatewayService.loginUser(loginDto);
    } catch (error) {
      throw new HttpException(error.response?.data?.message || 'Erro interno do servidor', error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('tutorial')
  @ApiOperation({ summary: 'Listar todos os tutoriais' })
  @ApiResponse({ status: 200, description: 'Lista de tutoriais', type: [CreateTutorialDto] })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async listTutorials(@Query('titulo') titulo?: string, @Query('data') data?: string) {
    try {
      return await this.gatewayService.listTutorials(titulo, data);
    } catch (error) {
      throw new HttpException(error.response?.data?.message || 'Erro interno do servidor', error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('tutorial')
  @ApiOperation({ summary: 'Criar um novo tutorial' })
  @ApiResponse({ status: 201, description: 'Tutorial criado com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async createTutorial(@Body() createTutorialDto: CreateTutorialDto) {
    try {
      return await this.gatewayService.createTutorial(createTutorialDto);
    } catch (error) {
      throw new HttpException(error.response?.data?.message || 'Erro interno do servidor', error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('tutorial/:id')
  @ApiOperation({ summary: 'Atualizar um tutorial existente' })
  @ApiResponse({ status: 200, description: 'Tutorial atualizado com sucesso', type: CreateTutorialDto })
  @ApiResponse({ status: 404, description: 'Tutorial não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async updateTutorial(@Param('id') id: string, @Body() updateTutorialDto: UpdateTutorialDto) {
    try {
      return await this.gatewayService.updateTutorial(id, updateTutorialDto);
    } catch (error) {
      throw new HttpException(error.response?.data?.message || 'Erro interno do servidor', error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('tutorial/:id')
  @ApiOperation({ summary: 'Remover um tutorial' })
  @ApiResponse({ status: 200, description: 'Tutorial removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Tutorial não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async removeTutorial(@Param('id') id: string) {
    try {
      return await this.gatewayService.removeTutorial(id);
    } catch (error) {
      throw new HttpException(error.response?.data?.message || 'Erro interno do servidor', error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

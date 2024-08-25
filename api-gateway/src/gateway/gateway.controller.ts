import { Controller, Post, Body, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  // Rota para criar um novo usuário
  @Post('user/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.gatewayService.createUser(createUserDto);
  }

  // Rota para realizar login de usuário
  @Post('user/login')
  async loginUser(@Body() loginDto: LoginDto) {
    return this.gatewayService.loginUser(loginDto);
  }

  // Rota para listar tutoriais
  @Get('tutorial')
  async listTutorials(@Query('titulo') titulo?: string, @Query('data') data?: string) {
    return this.gatewayService.listTutorials(titulo, data);
  }

  // Rota para criar um novo tutorial
  @Post('tutorial')
  async createTutorial(@Body() createTutorialDto: CreateTutorialDto) {
    return this.gatewayService.createTutorial(createTutorialDto);
  }

  // Rota para atualizar um tutorial existente
  @Patch('tutorial/:id')
  async updateTutorial(@Param('id') id: string, @Body() updateTutorialDto: UpdateTutorialDto) {
    return this.gatewayService.updateTutorial(id, updateTutorialDto);
  }

  // Rota para remover um tutorial existente
  @Delete('tutorial/:id')
  async removeTutorial(@Param('id') id: string) {
    return this.gatewayService.removeTutorial(id);
  }
}

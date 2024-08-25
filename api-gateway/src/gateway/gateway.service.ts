import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';

@Injectable()
export class GatewayService {
  constructor(private readonly httpService: HttpService) {}

  async createUser(createUserDto: CreateUserDto) {
    const response = await this.httpService.post('http://users-service:3000/user/signup', createUserDto).toPromise();
    return response.data;
  }

  async loginUser(loginDto: LoginDto) {
    const response = await this.httpService.post('http://users-service:3000/user/login', loginDto).toPromise();
    return response.data;
  }

  async listTutorials(titulo?: string, data?: string) {
    const params = { titulo, data };
    const response = await this.httpService.get('http://tutorials-service:3001/tutorial', { params }).toPromise();
    return response.data;
  }

  async createTutorial(createTutorialDto: CreateTutorialDto) {
    const response = await this.httpService.post('http://tutorials-service:3001/tutorial', createTutorialDto).toPromise();
    return response.data;
  }

  async updateTutorial(id: string, updateTutorialDto: UpdateTutorialDto) {
    const response = await this.httpService.patch(`http://tutorials-service:3001/tutorial/${id}`, updateTutorialDto).toPromise();
    return response.data;
  }

  async removeTutorial(id: string) {
    const response = await this.httpService.delete(`http://tutorials-service:3001/tutorial/${id}`).toPromise();
    return response.data;
  }
}

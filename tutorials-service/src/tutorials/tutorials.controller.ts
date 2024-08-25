import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { TutorialsService } from './tutorials.service';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';

@Controller('tutorial')
export class TutorialsController {
  constructor(private readonly tutorialsService: TutorialsService) {}

  @Get()
  async findAll(@Query('titulo') titulo?: string, @Query('data') data?: Date) {
    return this.tutorialsService.findAll(titulo, data);
  }

  @Post()
  async create(@Body() createTutorialDto: CreateTutorialDto) {
    return this.tutorialsService.create(createTutorialDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTutorialDto: UpdateTutorialDto) {
    return this.tutorialsService.update(id, updateTutorialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.tutorialsService.remove(id);
  }
}

import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/taskDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tarefas')
@Controller('tarefa')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Tarefa criada com sucesso', type: CreateTaskDto})
  @ApiResponse({ status: 400, description: 'Erro ao criar tarefa'})
  @ApiResponse({ status: 404, description: 'Usuário não encontrado'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Cria tarefas' })
  create(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Tarefas listadas com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao listar tarefas'})
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Lista todas as tarefas' })
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Tarefa listada com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao listar tarefa'})
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Lista uma tarefa por id' })
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao atualizar tarefa'})
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Atualizar uma tarefa' })
  update(@Param('id') id: string, @Body() body: CreateTaskDto) {
    return this.taskService.update(id, body);
  }

  @Put('status/:id')
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao atualizar tarefa'})
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Atualizar o status uma tarefa' })
  updateDone(@Param('id') id: string){
    return this.taskService.updateDone(id)
  }

  @Put('/playlist/:id')
  @ApiResponse({ status: 200, description: 'Tarefa adicionada na playlist com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao adicionar tarefa na playlist'})
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Adicionar tarefa na playlist' })
  addTaskInPlaylist(@Param('id') id: string, @Body() body: CreateTaskDto){
    return this.taskService.addTaskinPlaylist(id, body)
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao deletar tarefa'})
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Deletar uma tarefa' })
  remove(@Param('id') id: string) {
    return this.taskService.destroy(id);
  }
}

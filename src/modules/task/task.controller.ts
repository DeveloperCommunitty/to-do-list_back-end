import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/taskDto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PoliciesGuard } from 'src/guard/policies.guard';
import { Action } from 'src/casl/dto/casl.dto';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from 'src/guard/policies.check';

@ApiTags('Tarefas')
@Controller('tarefa')
@UseGuards(PoliciesGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Tarefa criada com sucesso', type: CreateTaskDto})
  @ApiResponse({ status: 400, description: 'Erro ao criar tarefa'})
  @ApiResponse({ status: 404, description: 'Usuário não encontrado'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Cria tarefas' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  create(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Tarefas listadas com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao listar tarefas'})
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Lista todas as tarefas' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Tarefa listada com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao listar tarefa'})
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Lista uma tarefa por id' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao atualizar tarefa'})
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Atualizar uma tarefa' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  update(@Param('id') id: string, @Body() body: CreateTaskDto) {
    return this.taskService.update(id, body);
  }

  @Put('status/:id')
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao atualizar tarefa'})
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Atualizar o status uma tarefa' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  updateDone(@Param('id') id: string){
    return this.taskService.updateDone(id)
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao deletar tarefa'})
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({ summary: 'Deletar uma tarefa' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  remove(@Param('id') id: string) {
    return this.taskService.destroy(id);
  }
}

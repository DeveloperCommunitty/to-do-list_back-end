import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskInPlaylistDto } from './dto/taskDto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PoliciesGuard } from 'src/guard/policies.guard';
import { Action } from 'src/casl/dto/casl.dto';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from 'src/guard/policies.check';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Tarefas')
@Controller('tarefa')
@UseGuards(PoliciesGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Tarefa criada com sucesso',
    type: CreateTaskDto,
  })
  @ApiResponse({ status: 400, description: 'Erro ao criar tarefa' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Cria tarefas' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  create(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @Get('tarefas/:id')
  @ApiResponse({ status: 200, description: 'Tarefa listada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao listar tarefas' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Lista as tarefas por id do usuário' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findAllUser(@Param('id') id: string, @Query() paginationDto: PaginationDto) {
    return this.taskService.findAllUser(id, paginationDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Tarefa listada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao listar tarefa' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Lista uma tarefa por id' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar tarefa' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Atualizar uma tarefa' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  update(@Param('id') id: string, @Body() body: CreateTaskDto) {
    return this.taskService.update(id, body);
  }

  @Put('status/:id')
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar tarefa' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Atualizar o status uma tarefa' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  updateDone(@Param('id') id: string) {
    return this.taskService.updateDone(id);
  }

  @Put('/playlist/:id')
  @ApiResponse({
    status: 200,
    description: 'Tarefa adicionada na playlist com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao adicionar tarefa na playlist',
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Adicionar tarefa na playlist' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  addTaskInPlaylist(
    @Param('id') id: string,
    @Body() body: UpdateTaskInPlaylistDto,
  ) {
    return this.taskService.addTaskinPlaylist(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao deletar tarefa' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Deletar uma tarefa' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  remove(@Param('id') id: string) {
    return this.taskService.destroy(id);
  }
}

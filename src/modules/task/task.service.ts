import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto, UpdateTaskInPlaylistDto } from './dto/taskDto';
import { PrismaService } from 'src/database/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Request } from 'express';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateTaskDto, userId: Request) {
    const usrCheck = await this.prisma.user.findUnique({
      where: {
        id: userId.user.id,
      },
    });

    if (!usrCheck)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    const task = await this.prisma.task.create({
      data: {
        ...body,
        userId: userId.user.id,
      },
    });

    if (!task)
      throw new HttpException('Erro ao criar tarefa', HttpStatus.BAD_REQUEST);

    return task;
  }

  async findAllUser(userId: Request, paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const offSet = (page - 1) * pageSize;

    const userCheck = await this.prisma.user.findUnique({ where: { id: userId.user.id } });

    if (!userCheck)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    const tasks = await this.prisma.task.findMany({
      skip: offSet,
      take: pageSize,
      where: { userId: userId.user.id },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        createdAt: true
      },
      orderBy: { id: 'desc'}
    });

    if (!tasks)
      throw new HttpException(
        'Erro ao listar tarefas do usuário',
        HttpStatus.BAD_REQUEST,
      );

    const totalTasks = await this.prisma.task.count();

    return {
      data: tasks,
      totalPage: Math.ceil(totalTasks / pageSize),
      currentPage: page,
    };
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
      },
    });

    if (!task)
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);

    return task;
  }

  async update(id: string, body: UpdateTaskDto) {
    const findTask = await this.prisma.task.findUnique({ where: { id } });
    if (!findTask)
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);

    const updateTask = await this.prisma.task.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
      },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
      },
    });

    if (!updateTask)
      throw new HttpException(
        'Erro ao atualizar tarefa',
        HttpStatus.BAD_REQUEST,
      );

    return updateTask;
  }

  async updateDone(id: string) {
    const findTask = await this.prisma.task.findUnique({ where: { id } });
    if (!findTask)
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);

    const doneUpdate = await this.prisma.task.update({
      where: { id },
      data: { done: findTask.done === false ? true : false },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
      },
    });

    if (!doneUpdate)
      throw new HttpException(
        'Não foi possível definir o status da tarefa',
        HttpStatus.BAD_REQUEST,
      );

    return doneUpdate;
  }

  async addTaskinPlaylist(id: string, body: UpdateTaskInPlaylistDto) {
    const taskCheck = await this.prisma.task.findUnique({ where: { id } });
    if (!taskCheck)
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);

    const taskInPlay = await this.prisma.task.update({
      where: { id },
      data: {
        playlistId: body.playlistId,
      },
    });

    if (!taskInPlay)
      throw new HttpException(
        'Erro ao adicionar tarefa na playlist',
        HttpStatus.BAD_REQUEST,
      );

    return taskInPlay;
  }

  async destroy(id: string) {
    const findTask = await this.prisma.task.findUnique({ where: { id } });
    if (!findTask)
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);

    await this.prisma.task.delete({ where: { id } });

    return {
      message: 'Tarefa deletada com sucesso',
      status: HttpStatus.NO_CONTENT,
    };
  }
}

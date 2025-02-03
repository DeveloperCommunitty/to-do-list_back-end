import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/userDto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(body: CreateUserDto) {
    const checkEmail = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (checkEmail)
      throw new HttpException('Email já existente', HttpStatus.BAD_REQUEST);

    if (body.role === 'ADMIN') {
      throw new HttpException('Não pode ser admin', HttpStatus.FORBIDDEN);
    }
    const randomsalt = randomInt(10, 16);
    const hashpassword = await bcrypt.hash(body.password, randomsalt);
    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        password: hashpassword,
        name: body.name,
      },
    });

    return user;
  }

  async findById(email: string) {
    const isEmail = email.includes('@');

    if (!isEmail)
      throw new HttpException(
        `E-mail invalido, verifique-o e tente novamente!`,
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select:{
        id: true,
        email: true,
        role: true,
        password: true
      }
    });

    if (!user)
      throw new HttpException(`E-mail não cadastrado!`, HttpStatus.NOT_FOUND);

    return user;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const offSet = (page - 1) * pageSize;

    const users = await this.prisma.user.findMany({
      skip: offSet,
      take: pageSize,
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        createdAt: true
      },
      orderBy: { id: 'desc' },
    });
    if (!users)
      throw new HttpException(
        'Erro ao listar usuários',
        HttpStatus.BAD_REQUEST,
      );

    const totalUsers = await this.prisma.user.count();

    return {
      data: users,
      totalPage: Math.ceil(totalUsers / pageSize),
      currentPage: page,
    };
  }

  async findOne(userId: Request) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId.user.id },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
      },
    });
    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    return user;
  }

  async update(userId: Request, body: UpdateUserDto) {
    const findUser = await this.prisma.user.findUnique({ where: { id: userId.user.id } });

    if (!findUser)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    const RandomSalt = randomInt(10, 16);
    const hashPassword = await bcrypt.hash(body.password, RandomSalt);

    const updateUser = await this.prisma.user.update({
      where: { id: userId.user.id },
      data: {
        name: body.name,
        password: hashPassword,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
      },
    });
    return updateUser;
  }

  async remove(id: string) {
    const findUser = await this.prisma.user.findUnique({ where: { id } });

    if (!findUser)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    if(findUser.role == 'ADMIN')
      throw new HttpException('Não é possivel deletar um administrador!', HttpStatus.UNAUTHORIZED);

    await this.prisma.user.delete({ where: { id } });

    return {
      message: 'Usuário deletado com sucesso',
      status: HttpStatus.NO_CONTENT,
    };
  }
}

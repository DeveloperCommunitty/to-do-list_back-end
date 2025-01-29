import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/userDto';
import { PrismaService } from 'src/database/prisma.service';
import *as bcrypt from 'bcryptjs'
import { randomInt } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  async create(body: CreateUserDto) {
    const checkEmail = await this.prisma.user.findUnique({
      where: {
        email: body.email
      }
    })
    if (checkEmail) throw new HttpException('Email já existente', HttpStatus.BAD_REQUEST)

      if(body.role==="ADMIN"){
        throw new HttpException ("Não pode ser admin", HttpStatus.FORBIDDEN)
      }
      const randomsalt = randomInt(10,16)
      const hashpassword = await bcrypt.hash(body.password, randomsalt)
      const user = await this.prisma.user.create({
        data: {
          email:body.email,
          password:hashpassword,
          name:body.name,
        }
      })

      return user
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        password: true,
        name: true
      }
    })
    if (!users) throw new HttpException('Erro ao listar usuários', HttpStatus.BAD_REQUEST)

    return users;
  }

  async findOne(id: string) {

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        password: true,
        name: true
      }
    })
    if (!user) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)

    return user;
  }



  async update(id: string, body: UpdateUserDto) {
    const findUser = await this.prisma.user.findUnique({ where: { id } })

    if (!findUser) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)

      const RandomSalt= randomInt(10,16)
      const hashPassword = await bcrypt.hash(body.password, RandomSalt)

    const updateUser = await this.prisma.user.update({
      where:{id},
      data:{
        name:body.name,
        password:hashPassword,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true
      }
    })
    return updateUser

  }

  async remove(id: string) {
    const findUser = await this.prisma.user.findUnique({ where: { id } })

    if (!findUser) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)

    await this.prisma.user.delete({ where: { id } })

    return {
      message: 'Usuário deletado com sucesso',
      status: HttpStatus.NO_CONTENT
    }

  }
}

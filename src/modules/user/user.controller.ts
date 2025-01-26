import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/userDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários') 
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Usuário criado com sucesso', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Email já existente' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Cria um novo usuário' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Usuários listados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao listar usuários' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Lista todos os usuários' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao buscar usuário' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Busca um usuário por ID' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar usuário' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Atualiza as informações de um usuário' })
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao deletar usuário' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Deleta um usuário' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

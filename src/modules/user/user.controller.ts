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
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/userDto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PoliciesGuard } from 'src/guard/policies.guard';
import { CheckPolicies } from 'src/guard/policies.check';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/dto/casl.dto';
import { Public } from 'src/auth/skipAuth/skip.auth';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Request } from 'express';

@ApiTags('Usuários')
@Controller('user')
@UseGuards(PoliciesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Usuário criado com sucesso',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Email já existente' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Usuários listados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao listar usuários' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiBearerAuth('access_token')
  @Public()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao buscar usuário' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Busca um usuário por ID' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findOne(@Req() userId: Request) {
    return this.userService.findOne(userId);
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar usuário' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Atualiza as informações de um usuário' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  update(@Req() userId: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao deletar usuário' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/playlistDto';
import { UpdatePlaylistDto } from './dto/playlistDto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PoliciesGuard } from 'src/guard/policies.guard';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from 'src/guard/policies.check';
import { Action } from 'src/casl/dto/casl.dto';

@ApiTags('Playlist')
@Controller('playlist')
@UseGuards(PoliciesGuard)
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Playlist criada com sucesso', type: CreatePlaylistDto})
  @ApiResponse({ status: 400, description: 'Erro ao criar Playlist'})
  @ApiResponse({ status: 404, description: 'Usuário não encontrado'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({summary: "Criar a Playlist"})
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get(':userId')
  @ApiResponse({ status: 200, description: 'Playlists listadas com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao listar Playlists'})
  @ApiResponse({ status: 404, description: 'Usuário não encontrado'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({summary: "Listar as Playlists"})
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findAll(@Param('userId') userId:string) {
    return this.playlistService.findAll(userId);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Playlist listada com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao buscar a playlist'})
  @ApiResponse({ status: 404, description: 'Usuário não encontrado'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({summary: "Listar a Playlist pelo id"})
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(id);
  }
  
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Playlist atualizada com sucesso', type: UpdatePlaylistDto})
  @ApiResponse({ status: 400, description: 'Erro ao atualizar Playlist'})
  @ApiResponse({ status: 404, description: 'Usuário não encontrado'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({summary: "Atualizar a Playlist"})
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Playlist apagada com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro ao buscar a playlist'})
  @ApiResponse({ status: 404, description: 'Usuário não encontrado'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @ApiOperation({summary: "Deletar a Playlist"})
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  remove(@Param('id') id: string) {
    return this.playlistService.remove(id);
  }
}

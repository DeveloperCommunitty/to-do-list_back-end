import { CreatePlaylistDto, UpdatePlaylistDto } from './dto/playlistDto';
import { PrismaService } from 'src/database/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreatePlaylistDto) {
    const usrCheck = await this.prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    });

    if (!usrCheck)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    const playlist = await this.prisma.playlist.create({
      data: {
        name: body.name,
        description: body.description,
        userId: body.userId,
      },
    });

    if (!playlist)
      throw new HttpException(
        'Erro ao criar a playlist',
        HttpStatus.BAD_REQUEST,
      );

    return playlist;
  }

  async findAll(userId: string, paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const offSet = (page - 1) * pageSize;

    const playlists = await this.prisma.playlist.findMany({
      skip: offSet,
      take: pageSize,
      where: { userId },
      select: {
        id: true,
        name: true,
        description: true,
      },
      orderBy: { id: 'desc' },
    });

    if (!playlists)
      throw new HttpException(
        'Erro ao listar Playlists',
        HttpStatus.BAD_REQUEST,
      );

    const totalPlaylist = await this.prisma.playlist.count();

    return {
      data: playlists,
      totalPages: Math.ceil(totalPlaylist / pageSize),
      currentPage: page,
    };
  }

  async findOne(id: string) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!playlist)
      throw new HttpException(
        'Erro ao buscar a playlist',
        HttpStatus.BAD_REQUEST,
      );

    return playlist;
  }

  async update(id: string, body: UpdatePlaylistDto) {
    const checkPlaylist = await this.prisma.playlist.findUnique({
      where: { id },
    });

    if (!checkPlaylist)
      throw new HttpException(
        'Erro ao buscar a playlist',
        HttpStatus.BAD_REQUEST,
      );

    const updatePlaylist = await this.prisma.playlist.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!updatePlaylist)
      throw new HttpException(
        'Erro ao atualizar Playlist',
        HttpStatus.BAD_REQUEST,
      );

    return updatePlaylist;
  }

  async remove(id: string) {
    const checkPlaylist = await this.prisma.playlist.findUnique({
      where: { id },
    });

    if (!checkPlaylist)
      throw new HttpException(
        'Erro ao buscar a playlist',
        HttpStatus.BAD_REQUEST,
      );

    await this.prisma.playlist.delete({ where: { id } });

    return {
      message: 'Playlist apagada com sucesso ',
      status: HttpStatus.OK,
    };
  }
}

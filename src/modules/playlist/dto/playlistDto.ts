import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({ example: 'Receitas', description: 'Nome da Playlist' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Uma playlist para verificar minhas receitas',
    description: 'Descrição da Playlist',
  })
  @IsNotEmpty()
  description: string;
}

export class UpdatePlaylistDto {
  @ApiProperty({ example: 'Receitas V2', description: 'Nome da Playlist' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Uma playlist para verificar minhas receitas V2',
    description: 'Descrição da Playlist',
  })
  @IsNotEmpty()
  description: string;
}

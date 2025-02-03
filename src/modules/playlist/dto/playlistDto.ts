import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({
    example: '82704273-d483-423a-1234-9b5b8447568a',
    description: 'Id do Usuario',
  })
  userId: string;

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

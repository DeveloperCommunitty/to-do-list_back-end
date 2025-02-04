import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Estudar xh', description: 'Título da Tarefa' })
  @IsNotEmpty({ message: 'Digite um título' })
  title: string;

  @ApiProperty({
    example: 'Estudar para realizar Concurso x',
    description: 'Descrição da tarefa',
  })
  @IsNotEmpty({ message: 'Digite uma descrição' })
  description: string;

  @ApiProperty({ description: 'Controle para tarefas concluídas' })
  done?: boolean;
}

export class UpdateTaskDto {
  @ApiProperty({ example: 'Estudar xh', description: 'Título da Tarefa' })
  title?: string;

  @ApiProperty({
    example: 'Estudar para realizar Concurso x',
    description: 'Descrição da tarefa',
  })
  description?: string;
}

export class UpdateTaskInPlaylistDto {
  @ApiProperty({
    example: '82704273-d483-423a-8302-9b5b8447568a',
    description: 'Id da playlist',
  })
  playlistId: string;
}

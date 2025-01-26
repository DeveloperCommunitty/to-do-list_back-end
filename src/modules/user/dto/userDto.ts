import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, Length } from "class-validator";

export enum Role{
    USER = 'USER',
    ADMIN = 'ADMIN'
}
export class CreateUserDto {
    @ApiProperty({ example: '82704273-d483-423a-8302-9b5b8447568a', description: 'Id do usuário'})
    @IsNotEmpty()
    id: string

    @ApiProperty({ example: 'Email@exemplo.com', description: 'Email do usuário'})
    @IsNotEmpty({ message: 'Insira seu email' })
    email: string

    @ApiProperty({ example: 'passwordexample123', description: 'Senha do Usúario'})
    @IsNotEmpty({ message: 'Digite sua senha' })
    password: string

    @ApiProperty({ example: 'Nome Teste', description: 'Nome do usuário'})
    @IsNotEmpty({ message: 'Digite seu nome' })
    name: string

    @ApiProperty({ example: 'Papel Exemplo', description: 'Papel do usuário'})
    @IsNotEmpty({ message: 'Insira seu papel' })
    role: Role
}
export class UpdateUserDto{
    @ApiProperty({ example: 'passwordexample123', description: 'Senha do Usúario'})
    @IsNotEmpty({ message: 'Digite sua senha' })
    password: string

    @ApiProperty({ example: 'Nome Teste', description: 'Nome do usuário'})
    @IsNotEmpty({ message: 'Digite seu nome' })
    name: string
}
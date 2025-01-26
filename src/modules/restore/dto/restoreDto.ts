import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class PasswordRedefinition{
    @ApiProperty({ example: 'teste@gmail.com', description: 'Email do usuário'})
    @IsNotEmpty()
    email: string; 
}

export class TokenConfirmed{
    @ApiProperty({ example: '82704273-d483-423a-8302-9b5b8447568a', description: 'Id do usuário'})
    @IsNotEmpty()
    userId: string;
    @ApiProperty({ example: '68d5727b-a8ab-43ff-ba55-e151933286e9', description: 'Id da restauração'})
    @IsNotEmpty()
    tokenId: string;
    @ApiProperty({ example: '1564', description: 'Token de recuperação'})
    @Length(4)
    @IsNotEmpty()
    token: string;
}

export class NewPassword{
    @ApiProperty({ example: '82704273-d483-423a-8302-9b5b8447568a', description: 'Id do usuário'})
    @IsNotEmpty()
    userId: string;
    @ApiProperty({ example: '68d5727b-a8ab-43ff-ba55-e151933286e9', description: 'Id da restauração'})
    @IsNotEmpty()
    tokenId: string;
    @ApiProperty({ example: 'secret', description: 'Nova senha do usuário'})
    @IsNotEmpty()
    @Length(6,18)
    password: string;
}


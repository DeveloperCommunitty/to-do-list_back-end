import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto{
    @ApiProperty({
        example: 'fulano@example.com',
        description: 'O Email do usuário',
    })
    @IsEmail()
    @IsNotEmpty({ message: 'Digite um email válido!' })
    email: string;
    @ApiProperty({ example: 'secret', description: 'A senha do usuário.' })
    @IsNotEmpty({ message: 'Digite uma senha!' })
    password: string;
}
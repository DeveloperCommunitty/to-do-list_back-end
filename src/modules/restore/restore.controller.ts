import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { NewPassword, PasswordRedefinition, TokenConfirmed } from './dto/restoreDto';
import { RestoreService } from './restore.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PoliciesGuard } from 'src/guard/policies.guard';
import { CheckPolicies } from 'src/guard/policies.check';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/dto/casl.dto';
import { Public } from 'src/auth/skipAuth/skip.auth';

@ApiTags('Restauração') 
@Controller('restore')
@UseGuards(PoliciesGuard)
export class RestoreController {
    constructor(private readonly restoreService: RestoreService){}

    @Post()
    @ApiResponse({ status: 200, description: 'Token de redefinição enviado com sucesso! O tempo de expiração dele é de 20 minutos!', type: PasswordRedefinition})
    @ApiResponse({ status: 400, description: 'Erro ao criar tarefa'})
    @ApiResponse({ status: 404, description: `Usuário inexistente!`})
    @ApiResponse({ status: 417, description:`Erro ao criar token de recuperação de usuário!`})
    @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
    @ApiOperation({ summary: 'Envia e cria o token de recuperação ao email do usuário' })
    @Public()
    create(@Body() body: PasswordRedefinition){
        return this.restoreService.createToken(body)
    }

    @Get(':userId')
    @ApiResponse({ status: 200, type: PasswordRedefinition})
    @ApiResponse({ status: 404, description: `Usuário inexistente!`})
    @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
    @ApiOperation({ summary: 'Lista todos os tokens de um usuário' })
    @ApiBearerAuth('access_token')
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    findAllTokens(@Param('userId') userId: string){
        return this.restoreService.findAllTokens(userId)
    }

    @Post('confirmed')
    @ApiResponse({ status: 200, description: 'O token foi enviado corretamente, agora digite sua nova senha!', type: TokenConfirmed})
    @ApiResponse({ status: 400, description: 'O token já foi utilizado!'})
    @ApiResponse({ status: 401, description: `O token enviado não corresponde ao enviado ao email! Tente novamente com outro token de redefinição.`})
    @ApiResponse({ status: 404, description: 'Usuário não encontrado ou Token inexistente ou o token está expirado!!'})
    @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
    @ApiOperation({ summary: 'Confirma o token enviado ao email' })
    @Public()
    confirmToken(@Body() body: TokenConfirmed){
        return this.restoreService.confirmToken(body)
    }

    @Post('new-credentials')
    @ApiResponse({ status: 200, description: 'Senha atualizada com sucesso!', type: TokenConfirmed})
    @ApiResponse({ status: 400, description: 'O token já foi utilizado!'})
    @ApiResponse({ status: 401, description: `O token enviado não corresponde ao enviado ao email! Tente novamente com outro token de redefinição.`})
    @ApiResponse({ status: 404, description: 'Usuário não encontrado ou Token inexistente ou o token está expirado ou o Token não está associado ao usuário especificado!'})
    @ApiResponse({ status: 417, description: `Ocorreu um erro ao atualizar a senha do usuário!`})
    @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
    @ApiOperation({ summary: 'Atualiza a senha do usuário' })
    @Public()
    updatePassword(@Body() body: NewPassword){
        return this.restoreService.updatePassword(body)
    }
}

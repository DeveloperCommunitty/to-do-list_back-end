import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findById(email);
    console.log(user);

    const passwordCorrect = await bcrypt.compare(password, user.password);

    console.log(passwordCorrect);
    if (!passwordCorrect)
      throw new UnauthorizedException({
        message: 'Falha de autenticação.',
        error: 'Credenciais inválidas',
      });

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    console.log(payload);
    console.log(await this.jwtService.signAsync(payload));

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

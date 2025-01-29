import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = 'admin@example.com'; 
    const password = 'secret'; 
    const name = 'Admin'; 

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN',
      },
    });

    console.log('Administrador criado com sucesso:', admin);
  } catch (error) {
    console.error('Erro ao criar o administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

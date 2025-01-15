
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Todo-List')
    .setDescription('API de gerenciamento de tarefas, com funcionalidades de criação, conclusão, gerenciamento de grupo de tarefas e recuperação de senha.\n\n' +
        'Além do controle de usuário por parte da administração.\n\n' +
        '`Desenvolvedores`\n' +
        '- [Jhoão Pedro](https://www.linkedin.com/in/jhoaosantos/)\n' +
        '- [Pedro Gabriel](https://www.linkedin.com/in/pedro-gabriel-488a05284/)\n' +
        '- [Victor Daniel](https://www.linkedin.com/in/victor-daniel-santos-cardoso-ab0787344/)\n' +
        '- [José Vítor](https://www.linkedin.com/in/jv-270492312/)\n\n',)
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

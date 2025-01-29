# 📝  Lista Colaborativa de Tarefas (To-Do List)

Este repositório contém o backend de um sistema simples onde os usuários podem: Fazer login para acessar uma lista de tarefas. Criar, editar, excluir e marcar tarefas como concluídas. com filtros de "Concluídas" e "Pendentes". Além de recuperar sua senha via um token enviado por email.

## 📋 Funcionalidades

1. Autenticação e Autorização
- Login com JWT e separação de papéis (usuário/administrador).
- Recuperação de senha via token enviado por e-mail.
- Registro de usuário com validação.
2. Usuário
- Tarefas: criar, editar, excluir, marcar como concluída/pendente.
- Listagem: filtro de tarefas concluídas e pendentes.
- Perfil: atualizar informações pessoais.
3. Administrador
- Usuários: listar, editar, excluir usuários.


- Administração: Permissões específicas para usuários administradores, incluindo operações avançadas de gerenciamento.

## 🛠 Tecnologias Utilizadas

- **🔴 NestJS**: Framework Node.js para a construção de APIs robustas e escaláveis.
- **🔗 Prisma**: ORM para Node.js e JavaScript, facilitando o gerenciamento do banco de dados.
- **🐳 Docker**: Solução para desenvolvimento e execução de aplicativos em contêineres.
- **📦 PostgreSQL**: Banco de dados relacional robusto e eficiente.

## 🚀 Começando

### Pré-requisitos

- Node.js (v20 ou superior)

- Docker Compose (opcional, para rodar o ambiente de forma isolada)

- PostgreSQL (se preferir rodar o banco de dados localmente)

## 💻 Instalação

```bash
# Clone este repositório
$ git clone https://github.com/DeveloperCommunitty/to-do-list_back-end.git

# Acesse a pasta do projeto no terminal/cmd
$ cd to-do-list_back-end

# Instale as dependências
$ npm install

# Configure o banco de dados
# Duplique o arquivo .env.example e renomeie a cópia para .env.
# Em seguida, adicione as credenciais corretas no campo DATABASE_URL:
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"

# Rode as migrações do banco de dados
$ npx prisma migrate dev

#Crie o usuário administrador para as rotas protegidas
$ npm run access-dm

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

```

### 🐳 Utilização com Docker

```bash
# Caso prefira rodar com Docker, utilize o comando abaixo para iniciar o ambiente com Docker Compose
$ docker-compose up
```

Abrir [http://localhost:3000/docs](http://localhost:3000/docs) com seu navegador para ver o resultado.

## 🔑 Autenticação e Autorização

Este projeto utiliza autenticação baseada em tokens JWT para proteger as rotas. Abaixo esta o usuário de teste disponível

| Tipo de Usuário | Email                 | Senha        |
| :-------------- | :-------------------- | :----------- |
| `Admin`         | `admin@example.com`   | `secret`   |


## 📄 Licença

Este projeto está licenciado sob a
[licença MIT](./LICENCE).

# 👥 Autores
| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/128644543?v=4" width=115><br><sub>Jhoão Pedro</sub>](https://github.com/Jhopn)<br><sup>Gerente de Projeto</sup> | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/139777957?v=4" width=115><br><sub>Pedro Gabriel</sub>](https://github.com/LPeter-nm)<br><sup>Analista do Backend</sup> | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/146472220?v=4" width=115><br><sub>Victor Daniel</sub>](https://github.com/keodanic)<br><sup>Programador</sup> | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/171981684?v=4" width=115><br><sub>José Vítor</sub>](https://github.com/ezezz7)<br><sup>Programador</sup> |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: |

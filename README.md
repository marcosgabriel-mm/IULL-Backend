# Sistema de Gerenciamento de Consultório Médico
Este é um sistema de gerenciamento para consultório médico desenvolvido em JavaScript com Node.js. O sistema permite o cadastro de pacientes e agendamento de consultas através de uma interface de linha de comando.

## Funcionalidades
Pacientes
- Cadastrar novos pacientes
- Excluir pacientes
- Listar pacientes (ordenados por CPF)
- Listar pacientes (ordenados por nome)

Consultas
- Agendar consultas
- Cancelar agendamentos
- Listar agenda completa ou por período

## Tecnologias Utilizadas
- Node.js
- Sequelize ORM
- PostgreSQL (configurável)
- Bibliotecas:
  - luxon (manipulação de datas)
  - cpf-cnpj-validator (validação de documentos)
  - prompt-sync (interface de linha de comando)
  - dotenv (variáveis de ambiente)

## Estrutura do Projeto
```text
.
├── main.js                 # Ponto de entrada da aplicação
├── package.json            # Dependências do projeto
├── src/
│   ├── config/             # Configurações (banco de dados)
│   ├── controllers/        # Lógica de negócio
│   ├── models/             # Modelos de dados
│   ├── repositories/       # Acesso ao banco de dados
│   ├── utils/              # Utilidades (validação)
│   └── views/              # Interface com usuário
```

## Instalação
1. Clone o repositório
2. Instale as dependências:
```shell
npm install
```

3. Configure o arquivo .env com as credenciais do banco de dados:
```shell
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
```
## Como Executar
```shell
node main.js
```

## Regras de Negócio
- Pacientes devem ter pelo menos 13 anos
- Nomes devem ter no mínimo 5 caracteres
- Consultas são agendadas em intervalos de 15 minutos
- Horário de funcionamento: 8h às 19h
- Não é possível excluir pacientes que possuem consultas agendadas
- Cada paciente só pode ter uma consulta futura agendada

## Modelos de Dados
Paciente
- CPF (primary key)
- Nome
- Data de Nascimento

Consulta
- ID (primary key, auto-incremento)
- Data da Consulta
- Hora de Início
- Hora de Término
- CPF do Paciente (foreign key)

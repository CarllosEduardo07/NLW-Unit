# pass.in

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**.

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

## Requisitos

### Requisitos funcionais

-   [ ] O organizador deve poder cadastrar um novo evento;
-   [ ] O organizador deve poder visualizar dados de um evento;
-   [ ] O organizador deve poser visualizar a lista de participantes;
-   [ ] O participante deve poder se inscrever em um evento;
-   [ ] O participante deve poder visualizar seu crachá de inscrição;
-   [ ] O participante deve poder realizar check-in no evento;

### Regras de negócio

-   [ ] O participante só pode se inscrever em um evento uma única vez;s
-   [ ] O participante só pode se inscrever em eventos com vagas disponíveis;
-   [ ] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

-   [ ] O check-in no evento será realizado através de um QRCode;

## Documentação da API (Swagger)

Para documentação da API, acesse o link: https://nlw-unite-nodejs.onrender.com/docs

## Anotações

- metodos HTTP: GET, POST PUT, DELETE PATCH, HEAD, OPTIONS.../corpo da requisição (request body)
- parametros de busca (search params / query params `http://localhost:3333/users?name=Carlos` )
- parametros de rota (route params) -> identificação de recursos DELETE `https://localhost:3333/users/5`
- cabeçalhos (Headers) -> Contexto

- semantica = Significado

- driver nativo / Query Builders / ORMs
- ORMs: Object Relational Mapping ( Hibernate / Doctrine / )

##### Status Code HTTP
- 20x => Sucesso
- 30x => Redirecionamento
- 40x => Erro do cliente (Erro em alguma informação enviada por que estar fazendo a chamanda p/ API)
- 50x => Erro do servidor (Um erro que está acontecendo INDEPENDENTE do que está sendo enviado para o servidor)

## Documentação da API (Swagger)

Para documentação da API, acesse o link: https://nlw-unite-nodejs.onrender.com/docs

## Banco de dados

Nessa aplicação vamos utilizar banco de dados relacional (SQL). Para ambiente de desenvolvimento seguiremos com o SQLite pela facilidade do ambiente.

### Diagrama ERD do banco de dados


![Diagrama ERD do banco de dados](https://github.com/CarllosEduardo07/NLW-Unit/assets/80606019/67771255-1c52-4b52-b58c-1896329f1679)


### Estrutura do banco (SQL)

```sql
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);

-- CreateTable
CREATE TABLE "attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeeId" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_email_key" ON "attendees"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendeeId_key" ON "check_ins"("attendeeId");
```

## Bibliotecas Usadas

- Framework web rápido e de baixo custo, para Node.js
```dash
npm i fastify
```

- ORM de próxima geração para Node.js e TypeScript | PostgreSQL, MySQL, MariaDB, SQL Server, SQLite, MongoDB e CockroachDB
```dash
npm i prisma
```

- ( npm i typescript ) TypeScript é um superconjunto de JavaScript que é compilado para limpar a saída de JavaScript.
- ( @type/node -D ) O repositório para definições de tipo TypeScript de alta qualidade.
```dash
npm i typescript @type/node -D
```
- TypeScript Execute: Node.js aprimorado para executar TypeScript e ESM
```dash
npm i tsx
```

- é uma biblioteca de validação de esquemas para JavaScript/TypeScript, com o Fastify.
```dash
npm i zod
```

- Integra o Zod, que é uma biblioteca de validação de esquemas para JavaScript/TypeScript, com o Fastify.
```dash
npm i fastify-type-provider-zod
```

- Gerador de documentação Swagger para Fastify (so fica a especificação da API)
```dash
npm i @fastify/swagger
```

- Servir Swagger-UI para Fastify (Interface Web, para navegar pela documentação)
```dash
npm i @fastify/swagger-ui
```

- Permite o uso de CORS em um aplicativo Fastify.
```dash
npm i @fastify/cors
```

- Faz o Build do TypeScript para JavaScrip, quando voce for fazer o deploy
```dash
npm i tsup -D
```

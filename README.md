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

metodos HTTP: GET, POST PUT, DELETE PATCH, HEAD, OPTIONS.../corpo da requisição (request body)
parametros de busca (search params / query params `http://localhost:3333/users?name=Carlos` )
parametros de rota (route params) -> identificação de recursos DELETE `https://localhost:3333/users/5`
cabeçalhos (Headers) -> Contexto

semantica = Significado

driver nativo / Query Builders / ORMs
ORMs: Object Relational Mapping ( Hibernate / Doctrine / )

Status Code HTTP
20x => Sucesso
30x => Redirecionamento
40x => Erro do cliente (Erro em alguma informação enviada por que estar fazendo a chamanda p/ API)
50x => Erro do servidor (Um erro que está acontecendo INDEPENDENTE do que está sendo enviado para o servidor)

## Bibliotecas Usadas

```dash
npm i fastify
```

```dash
npm i prisma
```

```dash
npm i typescript @type/node -D
```

```dash
npm i tsx
```

```dash
npm i zod
```

```dash
npm i fastify-type-provider-zod
```

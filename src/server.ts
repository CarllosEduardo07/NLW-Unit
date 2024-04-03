import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import { z } from 'zod';

const app = fastify();

const prisma = new PrismaClient({
    log: ['query'],
});

//metodos HTTP: GET, POST PUT, DELETE PATCH, HEAD, OPTIONS...
//corpo da requisição (request body)
//parametros de busca (search params / query params `http: //localhost:3333/users?name=Carlos` )
//parametros de rota (route params) -> identificação de recursos DELETE `https://localhost:3333/users/5`
//cabeçalhos (Headers) -> Contexto

// semantica = Significado

// driver nativo / Query Builders / ORMs
//ORMs: Object Relational Mapping ( Hibernate / Doctrine / )

app.post('/events', async (request, reply) => {
    //validação com zod
    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable(),
    });

    const data = createEventSchema.parse(request.body);

    const event = await prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            maximumAttendees: data.maximumAttendees,
            slug: new Date().toISOString(),
        },
    });
    // return {eventId: event.id}
    return reply.status(201).send({ eventId: event.id });
});

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!');
});

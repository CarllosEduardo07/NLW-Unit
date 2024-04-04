import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { generateSlug } from './utils/generate-slug';

const app = fastify();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const prisma = new PrismaClient({
    log: ['query'],
});

app.withTypeProvider<ZodTypeProvider>().post(
    '/events',
    {
        schema: {
            body: z.object({
                title: z.string().min(4),
                details: z.string().nullable(),
                maximumAttendees: z.number().int().positive().nullable(),
            }),
            response: {
                201: z.object({
                    eventId: z.string().uuid()
                })
            }
        },
    },
    async (request, reply) => {
        //validação com zod

        const { title, details, maximumAttendees } = request.body;
        const slug = generateSlug(title);

        //verificar se o slug exist
        const eventWithSameSlug = await prisma.event.findUnique({
            where: {
                slug: slug,
            },
        });

        if (eventWithSameSlug !== null) {
            throw new Error('Another event with same title already exists.');
        }

        const event = await prisma.event.create({
            data: {
                title,
                details,
                maximumAttendees,
                slug,
            },
        });
        // return {eventId: event.id}
        return reply.status(201).send({ eventId: event.id });
    },
);

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!');
});

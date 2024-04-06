import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';

export async function geteventAttendees(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:eventId/attendees',
    {
      schema: {
        summary: 'Get event attendees',
        tags: ['events'],
        params: z.object({
          eventId: z.string().uuid(),
        }),
        //parametros para a paginação (query params, o fastify chama de querystring)
        querystring: z.object({
          //fazendo busca por participantes
          query: z.string().nullish(),

          //indice da pagina atual
          pageIndex: z.string().nullish().default('0').transform(Number),
        }),
        response: {
          200: z.object({
            attendees: z.array(
              z.object({
                id: z.number(),
                name: z.string(),
                email: z.string().email(),
                createAt: z.date(),
                checkInAt: z.date().nullable(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { pageIndex, query } = request.query;

      const attendees = await prisma.attendee.findMany({
        //findMany, vamos retorna varios participantes
        select: {
          id: true,
          name: true,
          email: true,
          createAt: true,
          checkIn: {
            select: {
              createAt: true,
            },
          },
        },
        where: query
          ? {
              eventId,
              name: {
                contains: query,
              },
            }
          : {
              eventId,
            },
        //fazendo paginação de 10 participantes por vez
        take: 10,
        skip: pageIndex * 10,
        orderBy: {
          createAt: 'desc',
        },
      });
      return reply.send({
        attendees: attendees.map(attendees => {
          return {
            id: attendees.id,
            name: attendees.name,
            email: attendees.email,
            createAt: attendees.createAt,
            checkInAt: attendees.checkIn?.createAt ?? null, // ?? caso nao exista ele retorna null
          };
        }),
      });
    },
  );
}

import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        params: z.object({
          //ele vem como string mas vamos converter pra number
          //coerce: ele pode nao vim como number, mais eu quero que voce converta em number
          attendeeId: z.coerce.number().int(),
        }),
        response: {},
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;

      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
        where: {
          id: attendeeId,
        },
      });

      if (attendee == null) {
        throw new Error('Participante não encontrado.');
      }
      return reply.status(200).send({ attendee });
    },
  );
}

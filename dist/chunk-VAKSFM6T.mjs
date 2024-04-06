import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-event-attendees.ts
import z from "zod";
async function geteventAttendees(app) {
  app.withTypeProvider().get(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Get event attendees",
        tags: ["events"],
        params: z.object({
          eventId: z.string().uuid()
        }),
        //parametros para a paginação (query params, o fastify chama de querystring)
        querystring: z.object({
          //fazendo busca por participantes
          query: z.string().nullish(),
          //indice da pagina atual
          pageIndex: z.string().nullish().default("0").transform(Number)
        }),
        response: {
          200: z.object({
            attendees: z.array(
              z.object({
                id: z.number(),
                name: z.string(),
                email: z.string().email(),
                createAt: z.date(),
                checkInAt: z.date().nullable()
              })
            )
          })
        }
      }
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
              createAt: true
            }
          }
        },
        where: query ? {
          eventId,
          name: {
            contains: query
          }
        } : {
          eventId
        },
        //fazendo paginação de 10 participantes por vez
        take: 10,
        skip: pageIndex * 10,
        orderBy: {
          createAt: "desc"
        }
      });
      return reply.send({
        attendees: attendees.map((attendees2) => {
          return {
            id: attendees2.id,
            name: attendees2.name,
            email: attendees2.email,
            createAt: attendees2.createAt,
            checkInAt: attendees2.checkIn?.createAt ?? null
            // ?? caso nao exista ele retorna null
          };
        })
      });
    }
  );
}

export {
  geteventAttendees
};

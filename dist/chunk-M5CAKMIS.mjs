import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-attendee-bagde.ts
import z from "zod";
async function getAttendeeBadge(app) {
  app.withTypeProvider().get(
    "/attendees/:attendeeId/badge",
    {
      schema: {
        summary: "Get an attendee badge",
        tags: ["attendees"],
        params: z.object({
          //ele vem como string mas vamos converter pra number
          //coerce: ele pode nao vim como number, mais eu quero que voce converta em number
          attendeeId: z.coerce.number().int()
        }),
        response: {
          200: z.object({
            bagde: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url()
              //para seguir o formato de o url()
            })
          })
        }
      }
    },
    async (request, reply) => {
      const { attendeeId } = request.params;
      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true
            }
          }
        },
        where: {
          id: attendeeId
        }
      });
      if (attendee == null) {
        throw new BadRequest("Participante n\xE3o encontrado.");
      }
      console.log(request.hostname);
      const baseUrl = `${request.protocol}://${request.hostname}`;
      const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseUrl);
      return reply.status(200).send({
        bagde: {
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkInURL: checkInURL.toString()
          //convertendo a URL em string
        }
      });
    }
  );
}

export {
  getAttendeeBadge
};

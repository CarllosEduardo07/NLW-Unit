import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { createEvent } from './routes/create-event';
import { getEvent } from './routes/get-event';
import { registerForEvent } from './routes/register-for-event';
import { getAttendeeBadge } from './routes/get-attendee-bagde';
import { checkIn } from './routes/check-in';
import { geteventAttendees } from './routes/get-event-attendees';

const app = fastify();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(geteventAttendees)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!');
});

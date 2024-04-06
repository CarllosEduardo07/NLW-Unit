import fastify from 'fastify';

//fazendo documentação da API
import { fastifySwagger } from '@fastify/swagger';

import fastifySwaggerUi from '@fastify/swagger-ui';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { checkIn } from './routes/check-in';
import { createEvent } from './routes/create-event';
import { getAttendeeBadge } from './routes/get-attendee-bagde';
import { getEvent } from './routes/get-event';
import { geteventAttendees } from './routes/get-event-attendees';
import { registerForEvent } from './routes/register-for-event';

const app = fastify();

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Espeficicações da API para o back-end da aplicação pass.in contruida durante o NLW Unite da Rocketseat.',
      version: '1.0.0',
    },
  },
  // como o Swagger vai enternder o Schema: que foram colocados em cada rota.
  // vai fazer o Swagger entender que nos estamos utlizando Zod e vai fazer a tipagem de entrada e saida de dados
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs' // para acessar a documentação, basta coloca http://localhost:3333/docs
});

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(geteventAttendees);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!');
});

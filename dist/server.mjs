import {
  registerForEvent
} from "./chunk-IUBFFONP.mjs";
import {
  errorHandler
} from "./chunk-M7VQ5BBI.mjs";
import {
  checkIn
} from "./chunk-7W6UGDRK.mjs";
import {
  createEvent
} from "./chunk-JMT4J4D5.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-M5CAKMIS.mjs";
import {
  geteventAttendees
} from "./chunk-VAKSFM6T.mjs";
import {
  getEvent
} from "./chunk-OETDPZG6.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Espeficica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass.in contruida durante o NLW Unite da Rocketseat.",
      version: "1.0.0"
    }
  },
  // como o Swagger vai enternder o Schema: que foram colocados em cada rota.
  // vai fazer o Swagger entender que nos estamos utlizando Zod e vai fazer a tipagem de entrada e saida de dados
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
  // para acessar a documentação, basta coloca http://localhost:3333/docs
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(geteventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});

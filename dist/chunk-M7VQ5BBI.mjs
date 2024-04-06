import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";

// src/error-handle.ts
import { ZodError } from "zod";
var errorHandler = (error, reques, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Error during validation",
      error: error.flatten().fieldErrors
    });
  }
  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message });
  }
  return reply.status(500).send({ message: "Internal server error!" });
};

export {
  errorHandler
};

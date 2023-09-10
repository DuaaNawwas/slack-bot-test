import Fastify from "fastify";
import cors from "@fastify/cors";
const app = Fastify();
app.register(cors, {
  origin: "*",
});

app.get("/", async (request, reply) => {
  return reply.code(200).send("<h1>hi</h1>");
});
app.post("/a", async (request, reply) => {
  return reply.code(200).send({ message: "<h1>hi</h1>" });
});
app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at please http:localhost:${8080}`);
});

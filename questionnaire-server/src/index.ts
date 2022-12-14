import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { resolver } from "./resolver.js";
import { resolve } from "path";

const typeDefs = readFileSync(resolve("src/schema.graphql"), {
  encoding: "utf-8",
});

const server = new ApolloServer({
  typeDefs,
  resolvers: resolver,
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

import { resolvers } from "../resolvers";
import { readFileSync } from "fs";
import { resolve } from "path";
import { ApolloServer } from "@apollo/server";
import assert from "assert";
import { expect, test } from "@jest/globals";

const TEST_QUERY = `query ExampleQuery($nodeId: Int!) {
  getQuestionNodeById(nodeId: $nodeId) {
    question {
      answers {
        text
        nextNodeId
      }
      text
    }
  }
}`;

test("first Question Node has a question", async () => {
  const typeDefs = readFileSync(resolve("src/schema.graphql"), {
    encoding: "utf-8",
  });
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation({
    query: TEST_QUERY,
    variables: { nodeId: 1 },
  });
  assert(response.body.kind === "single");
  const data = response.body.singleResult.data;
  assert(data !== null);
  assert(data !== undefined);
  assert(data.getQuestionNodeById !== null);
  expect(data.getQuestionNodeById).toHaveProperty("question");
  // @ts-ignore
  const question: { text: string } = data.getQuestionNodeById.question;
  expect(question.text).toBe(
    "What do you mainly want to use your smartphone for?"
  );
});

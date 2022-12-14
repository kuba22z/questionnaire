import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Resolvers define how to fetch the types defined in your schema.
export const resolver = {
  Query: {
    getQuestionByNodeId(
      parent: any,
      args: { nodeId: number },
      contextValue: any,
      info: any
    ) {
      return prisma.question.findFirst({
        where: { id: { equals: args.nodeId } },
      });
    },
    questionTree: () => prisma.questionTree.findMany(),
    getCount: () => prisma.questionTree.count(),
  },
};

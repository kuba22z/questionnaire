import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  Query: {
    getQuestionNodeById(
      parent: any,
      args: { nodeId: number },
      contextValue: any,
      info: any
    ) {
      return prisma.questionTree.findFirst({
        where: { id: { equals: args.nodeId } },
        include: {
          question: {
            include: {
              answers: true,
            },
          },
        },
      });
    },
  },
};

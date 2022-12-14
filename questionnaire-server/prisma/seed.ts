import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.questionTree.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      path: [],
    },
    update: {},
  });
  await prisma.question.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      text: "Welche Farbe ist das?",
      nodeId: 1,
      answers: {
        createMany: {
          data: [
            {
              nextNodeId: 2,
              text: "Gelb",
            },
            {
              nextNodeId: 3,
              text: "Blau",
            },
          ],
        },
      },
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 2 },
    create: {
      id: 2,
      path: [1],
      recommendation: "Es ist richtig das ist die gelbe Farbe",
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 3 },
    create: {
      id: 3,
      path: [1],
      recommendation: "Es ist falsch, es war eine gelbe Farbe",
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

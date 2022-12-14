import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const d = await prisma.question.findMany();
  console.log(d.at(0));
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
      text: "Ist das Gelb",
      nodeId: 1,
      answers: {
        createMany: {
          data: [
            {
              nextNodeId: 2,
              text: "Gelb",
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
      recommendation: "Hier ist die gelbe Farbe",
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

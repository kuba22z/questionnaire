import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function initializeDatabase() {
  await prisma.questionTree.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      path: [],
      question: {
        create: {
          text: "What do you mainly want to use your smartphone for?",
          answers: {
            createMany: {
              data: [
                {
                  nextNodeId: 2,
                  text: "To make a phone call",
                },
                {
                  nextNodeId: 3,
                  text: "To take photos",
                },
                {
                  nextNodeId: 4,
                  text: "For playing films, music, videos",
                },
              ],
            },
          },
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
      question: {
        create: {
          text: "How long a day do you use the mobile phone",
          answers: {
            createMany: {
              data: [
                {
                  nextNodeId: 5,
                  text: "1-2 hours",
                },
                {
                  nextNodeId: 6,
                  text: "3-4 hours",
                },
                {
                  nextNodeId: 7,
                  text: "5-6 hours",
                },
              ],
            },
          },
        },
      },
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 3 },
    create: {
      id: 3,
      path: [1],
      question: {
        create: {
          text: "Which features are particularly important to you when taking photos?",
          answers: {
            createMany: {
              data: [
                {
                  nextNodeId: 8,
                  text: "Beautiful selfie photos",
                },
                {
                  nextNodeId: 9,
                  text: "Best photos at night",
                },
                {
                  nextNodeId: 10,
                  text: "Very good zooming",
                },
              ],
            },
          },
        },
      },
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 4 },
    create: {
      id: 4,
      path: [1],
      question: {
        create: {
          text: "What screen resolution should your phone have?",
          answers: {
            createMany: {
              data: [
                {
                  nextNodeId: 11,
                  text: "HD: 1.280 x 720 Pixel",
                },
                {
                  nextNodeId: 12,
                  text: "Full HD: 1.920 x 1.080 Pixel",
                },
                {
                  nextNodeId: 13,
                  text: "Quad HD (2k): 2.560 x 1.440 Pixel",
                },
                {
                  nextNodeId: 14,
                  text: "Ultra HD: 3.840 x 2.160 Pixel",
                },
              ],
            },
          },
        },
      },
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 5 },
    create: {
      id: 5,
      path: [1, 2],
      recommendation: "Realme C21Y",
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 6 },
    create: {
      id: 6,
      path: [1, 2],
      recommendation: "Xiaomi Redmi A1",
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 7 },
    create: {
      id: 7,
      path: [1, 2],
      recommendation: "Motorola Moto E20",
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 8 },
    create: {
      id: 8,
      path: [1, 3],
      recommendation: "iPhone 14 Pro Max",
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 9 },
    create: {
      id: 9,
      path: [1, 3],
      recommendation: "Samsung Galaxy S22 Ultra",
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 10 },
    create: {
      id: 10,
      path: [1, 3],
      recommendation: "Pixel 7 Pro",
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 11 },
    create: {
      id: 11,
      path: [1, 4],
      recommendation: "Asus ROG Phone 5S",
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 12 },
    create: {
      id: 12,
      path: [1, 4],
      recommendation: "Xiaomi Black Shark 5",
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 13 },
    create: {
      id: 13,
      path: [1, 4],
      recommendation: "OnePlus 10 Pro",
    },
    update: {},
  });
  await prisma.questionTree.upsert({
    where: { id: 14 },
    create: {
      id: 14,
      path: [1, 4],
      recommendation: "Samsung Galaxy 22",
    },
    update: {},
  });
}

initializeDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

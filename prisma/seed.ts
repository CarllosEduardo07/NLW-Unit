import { prisma } from './../src/lib/prisma';

async function seed() {
  await prisma.event.create({
    data: {
      id: '7de135bb-122c-4c03-96c4-155a741f912d',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento p/ devs apaixonados(as) por código!',
      maximumAttendees: 120,
    },
  });
}

//executando a função, e qundo termina, quando um console log
seed().then(() => {
  console.log('Database seeded!');
  prisma.$disconnect(); // força com que ele desconecte do banco
});

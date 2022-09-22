import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const teamData = [
    {
      name: 'teamA',
      registrationDate: new Date("2020-04-01"),
      groupNumber: 1,
    },
    {
      name: 'teamB',
      registrationDate: new Date("2020-05-02"),
      groupNumber: 1,
    },
    {
      name: 'teamC',
      registrationDate: new Date("2020-06-03"),
      groupNumber: 1,
    },
    {
      name: 'teamG',
      registrationDate: new Date("2020-06-14"),
      groupNumber: 2,
    },
    {
      name: 'teamH',
      registrationDate: new Date("2020-06-13"),
      groupNumber: 2,
    },
    {
      name: 'teamI',
      registrationDate: new Date("2020-06-12"),
      groupNumber: 2,
    },
  ]

  const matchData = [
    {
      homeTeamScore: 2,
      awayTeamScore: 2,
      homeTeamId: 1,
      awayTeamId: 2,
    },
    {
      homeTeamScore: 1,
      awayTeamScore: 3,
      homeTeamId: 1,
      awayTeamId: 3,
    },
  ]

  await prisma.team.createMany({data: teamData})
  await prisma.match.createMany({data: matchData})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

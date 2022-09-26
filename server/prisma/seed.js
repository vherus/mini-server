const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()

async function seed() {
    const password = await bcrypt.hash('123', 8)
  
    const createdUser = await prisma.user.create({
      data: {
        email: 'maxpower@email.com',
        password
      }
    })

    const userProfile = await prisma.profile.create({
      data: {
        userId: createdUser.id,
        firstName: 'Max',
        lastName: 'Power',
        username: 'MaxPower89',
        bio: 'I got my name off a microwave'
      }
    })

    const createdUserTwo = await prisma.user.create({
      data: {
        email: 'atanzarian@email.com',
        password
      }
    })

    const userProfileTwo = await prisma.profile.create({
      data: {
        userId: createdUserTwo.id,
        firstName: 'Armen',
        lastName: 'Tanzarian',
        username: 'Skinner69',
        bio: 'From the mean streets of captial city'
      }
    })
  
    const adminUser = await prisma.user.create({
      data: {
        email: 'ADMIN@admin.com',
        password,
        role: 'ADMIN'
      }
    })

    const adminProfile = await prisma.profile.create({
      data: {
        userId: adminUser.id,
        firstName: 'Craig',
        lastName: 'Pelton',
        username: 'DeanDangerous',
        bio: 'Best dean in the world'
      }
    })
  
    console.log('users', createdUser, userProfile, createdUserTwo, userProfileTwo, adminUser, adminProfile)
}

seed().catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
  
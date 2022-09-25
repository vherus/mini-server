const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()

async function seed() {
    const password = await bcrypt.hash('123', 8)
  
    const createdUser = await prisma.user.create({
      data: {
        email: 'notmyrealemail@email.com',
        password
      }
    })

    const userProfile = await prisma.profile.create({
      data: {
        userId: createdUser.id,
        firstName: 'Test',
        lastName: 'Test',
        username: 'username1',
        bio: 'im a new guy'
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
        firstName: 'Test',
        lastName: 'Test',
        username: 'username1',
        bio: 'im a new admin'
      }
    })
  
    console.log('users', createdUser, userProfile, adminUser, adminProfile)
}

seed().catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
  
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function executeQuery(sql) {
  try {
    const result = await prisma.$executeRawUnsafe(sql)
    console.log('Operation executed successfully.')
    return result
  } catch (error) {
    console.error('Error:', error.message)
  }
}
export async function executeReadQuery(sql) {
  try {
    const result = await prisma.$queryRawUnsafe(sql)
    console.log('Operation result:', result)
    return result
  } catch (error) {
    console.error('Error in READ:', error.message)
  }
}

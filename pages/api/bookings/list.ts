import prisma from '@/lib/prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { dateTime: 'asc' },
    })
    return res.status(200).json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

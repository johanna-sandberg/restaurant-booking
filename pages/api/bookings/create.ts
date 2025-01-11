import prisma from '@/lib/prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  guests: z.number().min(1).max(8),
  dateTime: z.string().refine(
    (value) => {
      const selectedDate = new Date(value)
      return selectedDate > new Date()
    },
    { message: 'Date and time must be in the future' }
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = req.body
    const parsed = bookingSchema.parse(body)

    const booking = await prisma.booking.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        guests: parsed.guests,
        dateTime: new Date(parsed.dateTime),
      },
    })

    return res.status(201).json(booking)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}

import prisma from '@/lib/prismaClient'
import handler from '@/pages/api/bookings/list'
import { createMocks } from 'node-mocks-http'

jest.mock('@/lib/prismaClient', () => ({
  booking: {
    findMany: jest.fn(),
  },
}))

describe('GET /api/bookings/list', () => {
  it('should return a list of bookings', async () => {
    const mockBookings = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        guests: 4,
        dateTime: new Date('2025-01-15T18:00:00.000Z').toISOString(),
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        guests: 2,
        dateTime: new Date('2025-01-16T18:00:00.000Z').toISOString(),
      },
    ]

    ;(prisma.booking.findMany as jest.Mock).mockResolvedValueOnce(mockBookings)

    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res.statusCode).toBe(200)
    const responseData = JSON.parse(res._getData())
    expect(responseData).toEqual(mockBookings)
  })

  it('should handle database errors', async () => {
    ;(prisma.booking.findMany as jest.Mock).mockRejectedValueOnce(
      new Error('Database error')
    )

    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res.statusCode).toBe(500)
    const responseData = JSON.parse(res._getData())
    expect(responseData.error).toBe('Internal server error')
  })
})

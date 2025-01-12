import prisma from '@/lib/prismaClient'
import handler from '@/pages/api/bookings/create'
import { createMocks } from 'node-mocks-http'

jest.mock('@/lib/prismaClient', () => ({
  booking: {
    create: jest.fn(),
  },
}))

describe('POST /api/bookings/create', () => {
  it('should create a new booking successfully', async () => {
    const mockBooking = {
      name: 'John Doe',
      email: 'john@example.com',
      guests: 4,
      dateTime: '2025-01-15T18:00:00.000Z',
    }

    ;(prisma.booking.create as jest.Mock).mockResolvedValueOnce({
      id: 1,
      ...mockBooking,
      dateTime: new Date(mockBooking.dateTime),
    })

    const { req, res } = createMocks({
      method: 'POST',
      body: mockBooking,
    })

    await handler(req, res)

    expect(res.statusCode).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        id: 1,
        ...mockBooking,
      })
    )
  })

  it('should return validation errors for invalid input', async () => {
    const invalidBooking = {
      name: '',
      email: 'not-an-email',
      guests: 0,
      dateTime: 'invalid-date',
    }

    const { req, res } = createMocks({
      method: 'POST',
      body: invalidBooking,
    })

    await handler(req, res)

    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.errors).toBeDefined()
    expect(data.errors).toHaveLength(4)
  })

  it('should return 500 for Internal server error', async () => {
    const mockBooking = {
      name: 'John Doe',
      email: 'john@example.com',
      guests: 4,
      dateTime: '2025-01-15T18:00:00.000Z',
    }

    ;(prisma.booking.create as jest.Mock).mockRejectedValueOnce(
      new Error('Database error')
    )

    const { req, res } = createMocks({
      method: 'POST',
      body: mockBooking,
    })

    await handler(req, res)

    expect(res.statusCode).toBe(500)
    const responseData = JSON.parse(res._getData())
    expect(responseData.error).toBe('Internal server error')
  })
})

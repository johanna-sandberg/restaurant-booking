'use client'

import { Booking } from '@/types/Booking'
import { useEffect, useState } from 'react'
import ListBookings from './ListBookings'

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch('/api/bookings/list')
        if (!response.ok) {
          throw new Error('Failed to fetch bookings')
        }
        const data = await response.json()
        setBookings(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  if (loading) return <p>Loading bookings...</p>
  if (error) return <p className='text-red-500'>{error}</p>

  return (
    <div className='min-h-screen p-8'>
      <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
      {bookings.length === 0 ? <p>No bookings available.</p> : <ListBookings />}
    </div>
  )
}

'use client'

import { useFetch } from '@/hooks/useFetch'
import { Booking } from '@/types/Booking'
import ListBookings from './ListBookings'

export default function AdminPage() {
  const {
    data: bookings,
    loading,
    error,
  } = useFetch<Booking[]>('/api/bookings/list')

  if (loading)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p className='text-gray-600 dark:text-gray-300 animate-pulse'>
          Loading bookings...
        </p>
      </div>
    )

  if (error)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p className='text-red-500 transition-opacity duration-300 ease-in'>
          {error}
        </p>
      </div>
    )

  return (
    <div className='min-h-screen p-8'>
      <h1 className='max-w-screen-sm mx-auto text-3xl font-bold mb-6'>
        Admin Dashboard
      </h1>
      {bookings ? (
        <ListBookings bookings={bookings} />
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  )
}

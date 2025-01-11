'use client'

import { Booking } from '@/types/Booking'
import { useEffect, useState } from 'react'

export default function ListBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filterDate, setFilterDate] = useState<string>('')
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch('/api/bookings/list')
      const data = await response.json()
      setBookings(data)
    }
    fetchBookings()
  }, [])

  useEffect(() => {
    if (filterDate) {
      const filtered = bookings.filter((booking) =>
        booking.dateTime.startsWith(filterDate)
      )
      setFilteredBookings(filtered)
    } else {
      setFilteredBookings(bookings)
    }
  }, [filterDate, bookings])

  return (
    <div className='p-6 bg-gray-400 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-lg border border-gray-400 dark:border-gray-600'>
      <h2 className='text-2xl font-semibold mb-4'>All Bookings</h2>

      <div className='mb-4'>
        <label htmlFor='filterDate' className='block text-sm font-medium'>
          Filter by Date
        </label>
        <input
          type='date'
          id='filterDate'
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className='mt-1 p-2 w-full border rounded-md bg-gray-200 dark:bg-gray-300 dark:text-gray-900 border-primary-border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400'
        />
      </div>

      <table className='w-full border-collapse border border-primary-border dark:border-gray-600'>
        <thead>
          <tr>
            <th className='border border-gray-500 dark:border-gray-600 px-4 py-2'>
              Name
            </th>
            <th className='border border-gray-500 dark:border-gray-600 px-4 py-2'>
              Email
            </th>
            <th className='border border-gray-500 dark:border-gray-600 px-4 py-2'>
              Guests
            </th>
            <th className='border border-gray-500 dark:border-gray-600 px-4 py-2'>
              Date & Time
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td className='border border-gray-500 dark:border-gray-600 px-4 py-2'>
                {booking.name}
              </td>
              <td className='border border-gray-500 dark:border-gray-600 px-4 py-2'>
                {booking.email}
              </td>
              <td className='border border-gray-500 dark:border-gray-600 px-4 py-2'>
                {booking.guests}
              </td>
              <td className='border border-gray-500 dark:border-gray-600 px-4 py-2'>
                {new Date(booking.dateTime).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

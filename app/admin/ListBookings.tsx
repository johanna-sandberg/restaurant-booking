'use client'

import { Booking } from '@/types/Booking'
import { useState } from 'react'
import BookingsTableRows from './BookingsTableRows'
import PaginationBar from './PaginationBar'
import TableDateFilter from './TableDateFilter'

interface ListBookingsProps {
  bookings: Booking[]
}

export default function ListBookings({ bookings }: ListBookingsProps) {
  const [filterDate, setFilterDate] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [bookingsPerPage] = useState<number>(5)

  const filteredBookings = filterDate
    ? bookings.filter((booking) => booking.dateTime.startsWith(filterDate))
    : bookings

  const indexOfLastBooking = currentPage * bookingsPerPage
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  )

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className='p-4 sm:p-6 max-w-screen-sm mx-auto bg-gray-400 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-lg border border-gray-400 dark:border-gray-600 transition-all duration-300'>
      <h2 className='text-lg sm:text-2xl font-semibold mb-3 sm:mb-4'>
        All Bookings
      </h2>

      <TableDateFilter filterDate={filterDate} setFilterDate={setFilterDate} />

      <div className='overflow-x-auto'>
        {filteredBookings.length > 0 ? (
          <table className='w-full border-collapse border border-primary-border dark:border-gray-600 text-sm sm:text-base'>
            <thead>
              <tr>
                <th className='border border-gray-500 dark:border-gray-600 px-2 sm:px-4 py-2'>
                  Name
                </th>
                <th className='border border-gray-500 dark:border-gray-600 px-2 sm:px-4 py-2'>
                  Email
                </th>
                <th className='border border-gray-500 dark:border-gray-600 px-2 sm:px-4 py-2'>
                  Guests
                </th>
                <th className='border border-gray-500 dark:border-gray-600 px-2 sm:px-4 py-2'>
                  Date & Time
                </th>
              </tr>
            </thead>
            <BookingsTableRows bookings={currentBookings} />
          </table>
        ) : (
          <p>There are no bookings for that date.</p>
        )}
      </div>
      <PaginationBar
        currentPage={currentPage}
        totalItems={filteredBookings.length}
        itemsPerPage={bookingsPerPage}
        onPageChange={paginate}
      />
    </div>
  )
}

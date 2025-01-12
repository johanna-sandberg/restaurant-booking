import { Booking } from '@/types/Booking'

interface BookingsTableRowsProps {
  bookings: ReadonlyArray<Booking>
}

function BookingsTableRows({ bookings }: BookingsTableRowsProps) {
  return (
    <tbody>
      {bookings.map((booking) => (
        <tr
          key={booking.id}
          className='hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200'
        >
          <td className='border border-gray-500 dark:border-gray-600 px-2 sm:px-4 py-2'>
            {booking.name}
          </td>
          <td className='border border-gray-500 dark:border-gray-600 px-2 sm:px-4 py-2'>
            {booking.email}
          </td>
          <td className='border border-gray-500 dark:border-gray-600 px-2 sm:px-4 py-2'>
            {booking.guests}
          </td>
          <td className='border border-gray-500 dark:border-gray-600 px-2 sm:px-4 py-2'>
            {new Date(booking.dateTime).toLocaleString()}
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default BookingsTableRows

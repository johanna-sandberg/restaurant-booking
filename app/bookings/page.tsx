'use client'

import BookingForm from '@/app/bookings/BookingForm'

export default function BookingPage() {
  const handleSubmit = (data: {
    name: string
    email: string
    guests: number
    dateTime: string
  }) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Booking submitted', data)
    }
  }

  return (
    <div>
      <h1>Book a Table</h1>
      <BookingForm onSubmit={handleSubmit} />
    </div>
  )
}

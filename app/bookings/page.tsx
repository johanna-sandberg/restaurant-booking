'use client'

import BookingForm from '@/bookings/BookingForm'

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
    <div className='py-8'>
      <BookingForm onSubmit={handleSubmit} />
    </div>
  )
}

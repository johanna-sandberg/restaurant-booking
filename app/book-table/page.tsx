'use client'

import BookingForm from './BookingForm'

export default function BookingPage() {
  const handleSubmit = async (data: {
    name: string
    email: string
    guests: number
    dateTime: string
  }) => {
    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (process.env.NODE_ENV === 'development') {
          console.error('Error:', errorData)
        }
        return
      }

      const booking = await response.json()
      if (process.env.NODE_ENV === 'development') {
        console.log('Booking created:', booking)
      }
      alert('Booking created successfully!')
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Unexpected error:', error)
      }
      alert('Failed to create booking. Please try again.')
    }
  }

  return (
    <div className='py-8'>
      <BookingForm onSubmit={handleSubmit} />
    </div>
  )
}

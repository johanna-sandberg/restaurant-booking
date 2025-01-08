'use client'

import { useEffect, useState } from 'react'

type BookingFormProps = {
  onSubmit: (data: {
    name: string
    email: string
    guests: number
    dateTime: string
  }) => void
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: 1,
    dateTime: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = 'Name is required'

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (formData.guests < 1 || formData.guests > 8) {
      newErrors.guests = 'Number of guests must be between 1 and 8'
    }

    if (!formData.dateTime) {
      newErrors.dateTime = 'Date and time is required'
    } else {
      if (isMounted) {
        const selectedDate = new Date(formData.dateTime)
        if (selectedDate <= new Date()) {
          newErrors.dateTime = 'Date and time must be in the future'
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (!isMounted) {
    return null
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-lg mx-auto p-8 space-y-6 bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg border border-gray-300 dark:border-gray-600'
    >
      <h2 className='text-2xl font-semibold text-center mb-4'>Book a Table</h2>

      <div>
        <label htmlFor='name' className='block text-sm font-medium mb-2'>
          Name
        </label>
        <input
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='w-full p-3 border rounded-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
        />
        {errors.name && (
          <p className='text-sm text-red-500 mt-1'>{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor='email' className='block text-sm font-medium mb-2'>
          Email
        </label>
        <input
          id='email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          className='w-full p-3 border rounded-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
        />
        {errors.email && (
          <p className='text-sm text-red-500 mt-1'>{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor='guests' className='block text-sm font-medium mb-2'>
          Number of Guests
        </label>
        <input
          id='guests'
          name='guests'
          type='number'
          value={formData.guests}
          onChange={handleChange}
          className='w-full p-3 border rounded-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
        />
        {errors.guests && (
          <p className='text-sm text-red-500 mt-1'>{errors.guests}</p>
        )}
      </div>

      <div>
        <label htmlFor='dateTime' className='block text-sm font-medium mb-2'>
          Date and Time
        </label>
        <input
          id='dateTime'
          name='dateTime'
          type='datetime-local'
          value={formData.dateTime}
          onChange={handleChange}
          className='w-full p-3 border rounded-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
        />
        {errors.dateTime && (
          <p className='text-sm text-red-500 mt-1'>{errors.dateTime}</p>
        )}
      </div>

      <button
        type='submit'
        className='w-full py-3 mt-4 bg-green-900 text-white rounded-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
      >
        Submit
      </button>
    </form>
  )
}

export default BookingForm

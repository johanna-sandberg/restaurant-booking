'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'

type BookingFormProps = {
  onSubmit: (data: {
    name: string
    email: string
    guests: number
    dateTime: string
  }) => void
}

const bookingFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  guests: z
    .number()
    .min(1, 'Number of guests must be at least 1')
    .max(8, 'Number of guests must be no more than 8'),
  dateTime: z.string().refine(
    (value) => {
      const selectedDate = new Date(value)
      return selectedDate > new Date()
    },
    { message: 'Date and time must be in the future' }
  ),
})

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
    const parsedResult = bookingFormSchema.safeParse({
      ...formData,
      guests: Number(formData.guests),
    })

    if (!parsedResult.success) {
      const zodErrors = parsedResult.error.errors.reduce(
        (acc, err) => ({
          ...acc,
          [err.path[0]]: err.message,
        }),
        {}
      )
      setErrors(zodErrors)
      return false
    }

    setErrors({})
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      const formDataWithNumberGuests = {
        ...formData,
        guests: Number(formData.guests),
      }
      onSubmit(formDataWithNumberGuests)
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
      className='max-w-lg mx-auto p-8 space-y-6 bg-gray-400 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-lg border border-gray-500 dark:border-gray-600'
    >
      <h2 className='text-2xl font-semibold mb-4'>Book a Table</h2>

      <div className='space-y-4'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            Name
          </label>
          <input
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            type='text'
            required
            className='mt-1 p-2 w-full border rounded-md bg-gray-200 dark:bg-gray-300 dark:text-gray-900 border-primary-border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500'
          />
          {errors.name && (
            <span className='text-sm text-red-600'>{errors.name}</span>
          )}
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            type='email'
            required
            className='mt-1 p-2 w-full border rounded-md bg-gray-200 dark:bg-gray-300 dark:text-gray-900 border-primary-border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500'
          />
          {errors.email && (
            <span className='text-sm text-red-600'>{errors.email}</span>
          )}
        </div>

        <div>
          <label
            htmlFor='guests'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            Guests
          </label>
          <input
            id='guests'
            name='guests'
            type='number'
            min='1'
            max='8'
            value={formData.guests}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded-md bg-gray-200 dark:bg-gray-300 dark:text-gray-900 border-primary-border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500'
          />
          {errors.guests && (
            <span className='text-sm text-red-600'>{errors.guests}</span>
          )}
        </div>

        <div>
          <label
            htmlFor='dateTime'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            Date and Time
          </label>
          <input
            id='dateTime'
            name='dateTime'
            type='datetime-local'
            value={formData.dateTime}
            onChange={handleChange}
            required
            className='mt-1 p-2 w-full border rounded-md bg-gray-200 dark:bg-gray-300 dark:text-gray-900 border-primary-border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500'
          />
          {errors.dateTime && (
            <span className='text-sm text-red-600'>{errors.dateTime}</span>
          )}
        </div>

        <div>
          <button
            type='submit'
            className='px-6 py-2 bg-lime-600 text-white rounded-lg shadow hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-lime-300'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default BookingForm

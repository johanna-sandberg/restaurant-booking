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
  guests: z.coerce
    .number()
    .min(1, 'Number of guests must be at least 1')
    .max(8, "Number of guests can't be more than 8"),
  dateTime: z.string().refine(
    (value) => {
      const selectedDate = new Date(value)
      return !isNaN(selectedDate.getTime()) && selectedDate > new Date()
    },
    { message: 'Date and time must be in the future' }
  ),
})

type BookingFormData = z.infer<typeof bookingFormSchema>

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    guests: 1,
    dateTime: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const validate = () => {
    const parsedResult = bookingFormSchema.safeParse(formData)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setIsSubmitting(true)
      onSubmit(formData)
      setIsSubmitting(false)

      setFormData({
        name: '',
        email: '',
        guests: 1,
        dateTime: '',
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? Number(value) : value,
    }))
  }

  const getErrorMessage = (field: keyof BookingFormData) => errors[field]

  if (!isMounted) {
    return null
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-xs sm:max-w-md mx-auto p-4 sm:p-8 space-y-4 sm:space-y-6 bg-gray-400 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-lg border border-gray-500 dark:border-gray-600'
    >
      <h2 className='text-lg sm:text-2xl font-semibold mb-3 sm:mb-4'>
        Book a Table
      </h2>

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
            className='mt-1 p-2 w-full border rounded-md bg-gray-200 dark:bg-gray-300 dark:text-gray-900 border-primary-border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all duration-200'
          />
          {getErrorMessage('name') && (
            <span
              key='name-error'
              className='text-sm text-red-600 font-semibold'
            >
              {getErrorMessage('name')}
            </span>
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
            type='text'
            className='mt-1 p-2 w-full border rounded-md bg-gray-200 dark:bg-gray-300 dark:text-gray-900 border-primary-border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all duration-200'
          />
          {getErrorMessage('email') && (
            <span
              key='email-error'
              className='text-sm text-red-600 font-semibold'
            >
              {getErrorMessage('email')}
            </span>
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
            value={formData.guests}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded-md bg-gray-200 dark:bg-gray-300 dark:text-gray-900 border-primary-border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all duration-200'
          />
          {getErrorMessage('guests') && (
            <span
              key='guests-error'
              className='text-sm text-red-600 font-semibold'
            >
              {getErrorMessage('guests')}
            </span>
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
            className='mt-1 p-2 w-full border rounded-md bg-gray-200 dark:bg-gray-300 dark:text-gray-900 border-primary-border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all duration-200'
          />
          {getErrorMessage('dateTime') && (
            <span
              key='dateTime-error'
              className='text-sm text-red-600 font-semibold'
            >
              {getErrorMessage('dateTime')}
            </span>
          )}
        </div>

        <div>
          <button
            type='submit'
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={`px-6 py-2 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-lime-300 transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 text-gray-800'
                : 'bg-lime-600 text-white hover:bg-lime-500'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default BookingForm

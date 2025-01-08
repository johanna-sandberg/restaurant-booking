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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor='guests'>Number of Guests</label>
        <input
          id='guests'
          name='guests'
          type='number'
          value={formData.guests}
          onChange={handleChange}
        />
        {errors.guests && <p>{errors.guests}</p>}
      </div>

      <div>
        <label htmlFor='dateTime'>Date and Time</label>
        <input
          id='dateTime'
          name='dateTime'
          type='datetime-local'
          value={formData.dateTime}
          onChange={handleChange}
        />
        {errors.dateTime && <p>{errors.dateTime}</p>}
      </div>

      <button type='submit'>Submit</button>
    </form>
  )
}

export default BookingForm

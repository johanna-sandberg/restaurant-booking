import BookingForm from '@/app/bookings/BookingForm'
import { fireEvent, render, screen } from '@testing-library/react'

describe('BookingForm', () => {
  it('should render all the form fields correctly', () => {
    render(<BookingForm onSubmit={jest.fn()} />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date and time/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('should display validation errors for empty fields when submitted', async () => {
    render(<BookingForm onSubmit={jest.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    expect(
      await screen.findByText(/number of guests must be between 1 and 8/i)
    ).toBeInTheDocument()
    expect(
      await screen.findByText(/date and time is required/i)
    ).toBeInTheDocument()
  })

  it('should display a validation error for an invalid email format', async () => {
    render(<BookingForm onSubmit={jest.fn()} />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument()
  })

  it('should display validation error when number of guests is out of range', async () => {
    render(<BookingForm onSubmit={jest.fn()} />)
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: '0' },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(
      await screen.findByText(/number of guests must be between 1 and 8/i)
    ).toBeInTheDocument()
  })

  it('should call onSubmit with valid form data', async () => {
    const mockOnSubmit = jest.fn()
    render(<BookingForm onSubmit={mockOnSubmit} />)

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: '4' },
    })
    fireEvent.change(screen.getByLabelText(/date and time/i), {
      target: { value: '2025-01-10T19:00' },
    })

    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      guests: 4,
      dateTime: '2025-01-10T19:00',
    })
  })

  it('should clear validation errors when fields are corrected', async () => {
    render(<BookingForm onSubmit={jest.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    })
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument()
  })

  it('should handle non-numeric and extreme values for guests input', async () => {
    render(<BookingForm onSubmit={jest.fn()} />)

    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: '-1' },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(
      await screen.findByText(/number of guests must be between 1 and 8/i)
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: 'abc' },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(
      await screen.findByText(/number of guests must be between 1 and 8/i)
    ).toBeInTheDocument()
  })

  it('should validate datetime input is not empty', async () => {
    render(<BookingForm onSubmit={jest.fn()} />)

    fireEvent.change(screen.getByLabelText(/date and time/i), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(
      await screen.findByText(/date and time is required/i)
    ).toBeInTheDocument()
  })

  it('should display validation error when the dateTime is in the past', async () => {
    const pastDate = new Date()
    pastDate.setMinutes(pastDate.getMinutes() - 10)
    render(<BookingForm onSubmit={jest.fn()} />)

    fireEvent.change(screen.getByLabelText(/date and time/i), {
      target: { value: pastDate.toISOString().slice(0, 16) },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(
      await screen.findByText(/date and time must be in the future/i)
    ).toBeInTheDocument()
  })

  it('should not call onSubmit if dateTime is in the past', async () => {
    const mockOnSubmit = jest.fn()
    const pastDate = new Date()
    pastDate.setMinutes(pastDate.getMinutes() - 10)

    render(<BookingForm onSubmit={mockOnSubmit} />)

    fireEvent.change(screen.getByLabelText(/date and time/i), {
      target: { value: pastDate.toISOString().slice(0, 16) },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})

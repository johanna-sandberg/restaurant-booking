import ListBookings from '@/app/admin/ListBookings'
import { Booking } from '@/types/Booking'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

const mockBookings: Booking[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    guests: 2,
    dateTime: '2023-10-01T18:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    guests: 4,
    dateTime: '2023-10-02T19:00:00Z',
  },
  {
    id: '3',
    name: 'Alice Carlsson',
    email: 'alice@example.com',
    guests: 3,
    dateTime: '2023-10-03T20:00:00Z',
  },
  {
    id: '4',
    name: 'Börje Nilsson',
    email: 'borje@example.com',
    guests: 1,
    dateTime: '2023-10-04T21:00:00Z',
  },
  {
    id: '5',
    name: 'Simon Davidsson',
    email: 'simon@example.com',
    guests: 5,
    dateTime: '2023-10-05T22:00:00Z',
  },
  {
    id: '6',
    name: 'Diana Strömblad',
    email: 'diana@example.com',
    guests: 2,
    dateTime: '2023-10-06T23:00:00Z',
  },
]

describe('ListBookings', () => {
  it('should render without crashing', () => {
    render(<ListBookings bookings={mockBookings} />)
    expect(screen.getByText('All Bookings')).toBeInTheDocument()
  })

  it('should filter bookings by date', () => {
    render(<ListBookings bookings={mockBookings} />)
    const dateInput = screen.getByLabelText('Filter by Date')
    fireEvent.change(dateInput, { target: { value: '2023-10-01' } })
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument()
  })

  it('should paginate bookings', () => {
    render(<ListBookings bookings={mockBookings} />)
    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument()
  })

  it('should display a message when no bookings are available', () => {
    render(<ListBookings bookings={[]} />)
    expect(
      screen.getByText('There are no bookings for that date.')
    ).toBeInTheDocument()
  })
})

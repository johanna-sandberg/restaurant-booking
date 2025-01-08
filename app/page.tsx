//import Image from 'next/image'

export default function Home() {
  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col justify-center items-center py-10'>
      <div className='text-center space-y-6'>
        <h1 className='text-4xl font-semibold'>Restaurant Booking</h1>
        <div className='space-x-4'>
          <a
            href='/bookings'
            className='inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
          >
            Book a Table
          </a>
          <a
            href='/admin'
            className='inline-block px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'
          >
            Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}

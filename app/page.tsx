export default function Home() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center py-10'>
      <div className='max-w-lg bg-gray-400 dark:bg-gray-700 rounded-lg shadow-lg p-8 border border-gray-500 dark:border-gray-600 text-center space-y-6'>
        <h1 className='text-3xl font-semibold'>Restaurant Booking</h1>
        <p className='text-gray-600 dark:text-gray-300'>
          Welcome to this restaurant booking platform
        </p>
        <div className='space-x-4'>
          <a
            href='/bookings'
            className='inline-block px-6 py-2 rounded-lg shadow transition-all bg-lime-600 text-white hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-lime-300 dark:focus:ring-lime-500'
          >
            Book a Table
          </a>
          <a
            href='/admin'
            className='inline-block px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg shadow transition-all focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-500'
          >
            Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}

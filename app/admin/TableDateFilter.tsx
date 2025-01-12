interface TableDateFilterProps {
  filterDate: string
  setFilterDate: (date: string) => void
}

function TableDateFilter({ filterDate, setFilterDate }: TableDateFilterProps) {
  return (
    <div className='mb-4'>
      <label htmlFor='filterDate' className='block text-sm font-medium'>
        Filter by Date
      </label>
      <input
        type='date'
        id='filterDate'
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        className='mt-1 p-2 w-full border rounded-md bg-gray-200 dark:bg-gray-300 dark:text-gray-900 border-primary-border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 transition-all duration-200'
      />
    </div>
  )
}

export default TableDateFilter

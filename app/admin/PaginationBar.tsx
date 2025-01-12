interface PaginationBarProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (pageNumber: number) => void
}

export default function PaginationBar({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationBarProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className='flex justify-center mt-4 space-x-2'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Prev
      </button>
      <span className='px-4 py-2'>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Next
      </button>
    </div>
  )
}

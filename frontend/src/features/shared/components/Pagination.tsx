import React from 'react';

interface PaginationProps {
  pageCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageCount = 1,
  currentPage = 1,
  onPageChange = () => {},
}) => {
  if (pageCount <= 1) return null;

  return (
    <nav className='flex justify-center mt-8'>
      <ul className='flex items-center bg-background-card border border-(--color-border-card,rgba(32,224,150,0.08)) rounded-md shadow-sm px-2 py-1'>
        <li
          className={`mx-1 px-2 py-1 rounded-md transition-colors ${
            currentPage === 1
              ? 'text-text-secondary cursor-not-allowed select-none'
              : 'text-text-primary cursor-pointer hover:bg-white/5'
          }`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          &laquo;
        </li>

        {[...Array(pageCount)].map((_, idx) => (
          <li
            key={idx}
            onClick={() => onPageChange(idx + 1)}
            className={
              `mx-1 px-3 py-1 rounded-md font-medium transition-colors duration-150 cursor-pointer ` +
              (currentPage === idx + 1
                ? 'bg-primary text-white shadow'
                : 'text-text-primary hover:bg-white/5')
            }
          >
            {idx + 1}
          </li>
        ))}

        <li
          className={`mx-1 px-2 py-1 rounded-md transition-colors ${
            currentPage === pageCount
              ? 'text-text-secondary cursor-not-allowed select-none'
              : 'text-text-primary cursor-pointer hover:bg-white/5'
          }`}
          onClick={() => currentPage < pageCount && onPageChange(currentPage + 1)}
        >
          &raquo;
        </li>
      </ul>
    </nav>
  );
};

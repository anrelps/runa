import React from 'react';

interface PaginationProps {
  pageCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

// Modern pagination design using Tailwind and site theme colors
export const Pagination: React.FC<PaginationProps> = ({
  pageCount = 5,
  currentPage = 1,
  onPageChange = () => {},
}) => {
  return (
    <nav className='flex justify-center mt-8'>
      <ul className='flex items-center bg-background-card border border-(--color-border-card,rgba(32,224,150,0.08)) rounded-md shadow-sm px-2 py-1'>
        <li className='mx-1 px-2 py-1 rounded-md text-text-secondary cursor-not-allowed select-none'>
          &laquo;
        </li>
        {[...Array(pageCount)].map((_, idx) => (
          <li
            key={idx}
            className={
              `mx-1 px-3 py-1 rounded-md font-medium transition-colors duration-150 cursor-pointer ` +
              (currentPage === idx + 1
                ? 'bg-primary text-white shadow'
                : 'text-(--color-text-primary,#fff) hover:bg-[var(--color-primary,#20e096)/10]')
            }
          >
            {idx + 1}
          </li>
        ))}
        <li className='mx-1 px-2 py-1 rounded-md text-text-secondary cursor-not-allowed select-none'>
          &raquo;
        </li>
      </ul>
    </nav>
  );
};

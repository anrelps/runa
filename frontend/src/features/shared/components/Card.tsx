import React from 'react';

type CardProps = {
  children: React.ReactNode;
  decorated?: boolean;
  className?: string;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, decorated = false, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative w-full rounded-2xl overflow-hidden
                    bg-background-card border border-border-card
                    p-4 sm:p-6 ${className}`}
      >
        {decorated && (
          <div
            className='absolute top-0 left-0 right-0 h-0.5
                          bg-linear-to-r from-primary to-transparent'
          />
        )}
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

export default Card;

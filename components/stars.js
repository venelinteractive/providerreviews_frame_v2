// components/Stars.js
import React from 'react';

const Stars = ({ ratingValue, size = 20, colors = {}, noBorder = false }) => {
  const defaultColors = {
    rear: 'lightgray',
    mask: '#0070f3',
    stroke: 'lightgray',
    ...colors,
  };

  // Convert rating to percentage
  const percentage = (ratingValue / 5) * 100;

  return (
    <div className='inline-flex relative' style={{ fontSize: size }}>
      {/* Background stars */}
      <div className='flex' aria-hidden='true'>
        {[...Array(5)].map((_, i) => (
          <svg
            key={`star-bg-${i}`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill={defaultColors.rear}
            className={`w-[1em] h-[1em] ${!noBorder ? 'stroke-current' : ''}`}
            style={
              !noBorder
                ? { stroke: defaultColors.stroke, strokeWidth: 1 }
                : undefined
            }
          >
            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
          </svg>
        ))}
      </div>

      {/* Foreground stars (masked by width) */}
      <div
        className='flex absolute top-0 left-0 overflow-hidden'
        style={{ width: `${percentage}%` }}
      >
        {[...Array(5)].map((_, i) => (
          <svg
            key={`star-fg-${i}`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill={defaultColors.mask}
            className={`w-[1em] h-[1em] ${!noBorder ? 'stroke-current' : ''}`}
            style={
              !noBorder
                ? { stroke: defaultColors.stroke, strokeWidth: 1 }
                : undefined
            }
          >
            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
          </svg>
        ))}
      </div>

      {/* Hidden input for accessibility */}
      <div className='sr-only'>{ratingValue} out of 5 stars</div>
    </div>
  );
};

export default React.memo(Stars);

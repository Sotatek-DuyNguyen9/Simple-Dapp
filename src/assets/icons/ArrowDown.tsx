/* eslint-disable max-len */
import React from 'react';

interface Props {
  size?: 'md' | 'lg';
  svgFill?: string;
  pathFill?: string;
}

const ArrowDown: React.FC<Props> = ({ size = 'md', svgFill = 'none', pathFill = 'white' }) => {
  const returnSize = (size: string) => {
    switch (size) {
      case 'lg':
        return {
          height: '24',
          width: '24',
          viewBox: '0 0 24 24',
        };
      case 'md':
        return {
          height: '14',
          width: '14',
          viewBox: '0 0 24 24',
        };
      default:
        break;
    }
  };

  return (
    <>
      <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 1.33325L5 5.33325L1 1.33325H9Z"
          fill="#E1E5EB"
          stroke="#E1E5EB"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default ArrowDown;

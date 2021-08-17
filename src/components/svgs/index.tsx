import React from 'react';

interface LogoProps {
  width?: string | number;
  height?: string | number;
}

export const Logo = ({ width = 20, height = 20 }: LogoProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="64"
        height="66"
      >
        <rect width="64" height="66" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0)">
        <path d="M34 0V24L75 -2.5" stroke="#916AFF" strokeWidth="8" />
        <path d="M19 0V46L91.5 26.5" stroke="#916AFF" strokeWidth="8" />
        <path d="M4 0V61.5H64" stroke="#916AFF" strokeWidth="8" />
      </g>
    </svg>
  );
};

export const PlusSquare = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 8C6 6.89543 6.89543 6 8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8Z"
        stroke="#916AFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="1" fill="#9B6DED" />
    </svg>
  );
};

export const Login = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 11L12 15L16 11"
        stroke="#60BE8F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15L12 3"
        stroke="#60BE8F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="21" r="1" fill="#60BE8F" />
    </svg>
  );
};

export const Logout = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 7L12 3L8 7"
        stroke="#4653F7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3L12 15"
        stroke="#4653F7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="21" r="1" fill="#4653F7" />
    </svg>
  );
};

export const PlusSquareEdged = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 6H12H9M18 15V12V9M6 9V12V15M9 18H12H15"
        stroke="#916AFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="1" fill="#9B6DED" />
    </svg>
  );
};

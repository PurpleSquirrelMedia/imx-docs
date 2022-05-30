import React from 'react';

type Props = {
  className?: string;
  color?: string;
};

const ExplorerDarkIcon = ({ className }: Props) => (
  <svg
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    className={className}
  >
    <path
      d="M0.333252 20C0.333252 8.95431 9.28756 0 20.3333 0C31.3789 0 40.3333 8.95431 40.3333 20C40.3333 31.0457 31.3789 40 20.3333 40C9.28756 40 0.333252 31.0457 0.333252 20Z"
      fill="#EEEEEE"
    />
    <path
      d="M20.3333 11.1111C15.4267 11.1111 11.4445 15.0933 11.4445 20C11.4445 24.9066 15.4267 28.8889 20.3333 28.8889C25.24 28.8889 29.2222 24.9066 29.2222 20C29.2222 15.0933 25.24 11.1111 20.3333 11.1111ZM20.3333 27.1111C16.4133 27.1111 13.2222 23.92 13.2222 20C13.2222 16.08 16.4133 12.8889 20.3333 12.8889C24.2533 12.8889 27.4445 16.08 27.4445 20C27.4445 23.92 24.2533 27.1111 20.3333 27.1111ZM15.4445 24.8889L22.12 21.7866L25.2222 15.1111L18.5467 18.2133L15.4445 24.8889ZM20.3333 19.0222C20.8756 19.0222 21.3111 19.4578 21.3111 20C21.3111 20.5422 20.8756 20.9778 20.3333 20.9778C19.7911 20.9778 19.3556 20.5422 19.3556 20C19.3556 19.4578 19.7911 19.0222 20.3333 19.0222Z"
      fill="#404040"
    />
  </svg>
);

export default ExplorerDarkIcon;

import * as React from 'react';
import { SVGProps } from 'react';

const HelpIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={17}
        height={16}
        fill="none"
        {...props}
    >
      <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.313 15c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7Zm0-13c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6Z"
      />
      <path
          d="M8.313 4.5c-1.11 0-2 .89-2 2h1c0-.55.45-1 1-1s1 .45 1 1c0 1-1.5.88-1.5 2.5h1c0-1.12 1.5-1.25 1.5-2.5 0-1.11-.89-2-2-2ZM8.311 11.62a.62.62 0 1 0 0-1.24.62.62 0 0 0 0 1.24Z"
      />
      <path
          d="M6.813 7a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM8.313 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"
      />
    </svg>
);
export default HelpIcon;

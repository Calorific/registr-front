import * as React from 'react';
import { SVGProps } from 'react';

const ExitIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={17}
        height={14}
        fill="none"
        {...props}
    >
      <path
          stroke="#B01212"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.793 4.192v-1.48a1.48 1.48 0 0 0-1.48-1.482H2.128A1.48 1.48 0 0 0 .65 2.711v8.885a1.481 1.481 0 0 0 1.48 1.481h5.183a1.48 1.48 0 0 0 1.481-1.48v-1.481M5.091 7.154h8.885m0 0-2.221-2.221m2.221 2.22-2.221 2.222"
      />
    </svg>
);
export default ExitIcon;
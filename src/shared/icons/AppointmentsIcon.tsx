import * as React from 'react';
import { SVGProps } from 'react';

const AppointmentsIcon = (props: SVGProps<SVGSVGElement>) => (
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
          d="M4.09 2.74H2.61a1.48 1.48 0 0 0-1.481 1.48v8.885a1.48 1.48 0 0 0 1.48 1.481h7.405a1.48 1.48 0 0 0 1.48-1.48V4.22a1.48 1.48 0 0 0-1.48-1.48h-1.48m-4.443 0c0-.393.156-.615.433-.892a1.48 1.48 0 0 1 1.047-.434h1.481c.393 0 .77.156 1.047.434.278.278.434.499.434.891m-4.442 0c0 .393.156.601.433.879.278.278.655.389 1.047.389h1.481c.393 0 .77-.111 1.047-.39.278-.277.434-.485.434-.878M3.63 6.26h5.5m-3.558 4H3.63m3.5-2h-3.5"
      />
    </svg>
);
export default AppointmentsIcon;

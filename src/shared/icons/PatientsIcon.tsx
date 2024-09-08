import * as React from 'react';
import { SVGProps } from 'react';

const PatientsIcon = (props: SVGProps<SVGSVGElement>) => (
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
          d="M.648 14.664v-1.481A2.962 2.962 0 0 1 3.61 10.22h2.962a2.961 2.961 0 0 1 2.961 2.962v1.48m.74-13.23a2.961 2.961 0 0 1 0 5.738m3.703 7.493v-1.481a2.962 2.962 0 0 0-2.221-2.85M2.129 4.297a2.962 2.962 0 1 0 5.924 0 2.962 2.962 0 0 0-5.924 0Z"
      />
    </svg>
);
export default PatientsIcon;

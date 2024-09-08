import * as React from 'react';
import { SVGProps } from 'react';

const SettingsIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={17}
        height={17}
        fill="none"
        {...props}
    >
      <path
          stroke="#7D7D7D"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.143 3.911a1.647 1.647 0 0 1 .833 1.443v5.393c0 .599-.328 1.151-.857 1.442L8.12 15.351a1.68 1.68 0 0 1-1.617 0l-4.998-3.162a1.648 1.648 0 0 1-.858-1.442V5.353c0-.6.328-1.15.858-1.442L6.504.964a1.725 1.725 0 0 1 1.666 0l4.997 2.947h-.024Z"
      />
      <path
          stroke="#7D7D7D"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.091 8.154a2.221 2.221 0 1 0 4.443 0 2.221 2.221 0 0 0-4.443 0Z"
      />
    </svg>
);
export default SettingsIcon;

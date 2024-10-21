import * as React from 'react';
import { SVGProps } from 'react';

const ExitIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11.5 7V5.5C11.5 5.10218 11.342 4.72064 11.0607 4.43934C10.7794 4.15804 10.3978 4 10 4H4.75C4.35218 4 3.97064 4.15804 3.68934 4.43934C3.40804 4.72064 3.25 5.10218 3.25 5.5V14.5C3.25 14.8978 3.40804 15.2794 3.68934 15.5607C3.97064 15.842 4.35218 16 4.75 16H10C10.3978 16 10.7794 15.842 11.0607 15.5607C11.342 15.2794 11.5 14.8978 11.5 14.5V13M7.75 10H16.75M16.75 10L14.5 7.75M16.75 10L14.5 12.25" stroke="#B01212" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export default ExitIcon;
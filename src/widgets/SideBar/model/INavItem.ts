import React from 'react';


export interface INavItem {
  href: string,
  Icon: (props: { isActive: boolean }) => React.ReactNode,
  name: string,
}
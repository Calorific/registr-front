import { SVGProps } from 'react';


export interface INavItem {
  href: string,
  Icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element,
  name: string,
  disabled?: boolean
}
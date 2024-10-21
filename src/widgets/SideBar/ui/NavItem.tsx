'use client';
import React from 'react';
import Link from 'next/link';
import { INavItem } from '@/widgets/SideBar/model/INavItem';
import { useActivePath } from '@/widgets/SideBar/api/helper';


const NavItem = ({ href, Icon, name }: INavItem) => {
  const isActive = useActivePath()(href);

  return (
    <Link
      href={href}
      className={'flex gap-x-[12px] items-center '}
    >
      <Icon isActive={isActive} />
      <span className={'text-[16px] ' + (isActive ? 'font-bold text-blue' : '')}>{name}</span>
    </Link>
  );
};

export default NavItem;
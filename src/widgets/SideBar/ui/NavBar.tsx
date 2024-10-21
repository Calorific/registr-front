'use client';
import React from 'react';
import { navRoutes } from '@/widgets/SideBar/config/navRoutes';
import { INavItem } from '@/widgets/SideBar/model/INavItem';
import NavItem from '@/widgets/SideBar/ui/NavItem';
import Link from 'next/link';
import { Logo } from '@/widgets/SideBar/ui/Logo';

export const NavBar = () => {
  return (
    <nav>
      <Link href="/">
        <Logo />
      </Link>

      <ul className="flex flex-col gap-y-[24px] mt-[42px]">
        {navRoutes.map(({ href, Icon, name }: INavItem, i) => (
          <NavItem key={i} href={href} Icon={Icon} name={name} />
        ))}
      </ul>
    </nav>
  );
};

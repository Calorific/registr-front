'use client';
import React, { ReactElement } from 'react';
import Link from 'next/link';
import { INavItem } from '@/widgets/SideBar/model/INavItem';
import { useActivePath } from '@/widgets/SideBar/api/helper';
import styles from '../ui/NavItem.module.css';


const NavItem = ({ href, Icon, name, disabled }: INavItem): ReactElement => {
  const isActivePath = useActivePath();
  return (
      <Link style={disabled ? { pointerEvents: 'none', color: '#AAA' } : {}} href={href}
            className={isActivePath(href) ? styles.activeLink : styles.link}>
        <Icon stroke={isActivePath(href) ? '#7EB0C6' : disabled ? '#AAA' : '#000'} />
        <span className={styles.linkText}>{name}</span>
      </Link>
  );
};

export default NavItem;
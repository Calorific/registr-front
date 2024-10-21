'use client';
import React from 'react';
import ExitIcon from '@/shared/icons/ExitIcon';
import styles from './LogoutButton.module.css';
import { useSession } from '@/entities/Session/api';

export const LogoutButton = () => {
  const session = useSession();

  return (
    <li>
      <button className="flex gap-x-[12px] items-center text-[16px] text-red" onClick={session.logout}>
        <ExitIcon />
        Выход
      </button>
    </li>
  );
};

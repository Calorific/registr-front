'use client';
import React from 'react';
import ExitIcon from '@/shared/icons/ExitIcon';
import styles from './LogoutButton.module.css';
import { useSession } from '@/entities/Session/api';

const LogoutButton = () => {
  const session = useSession();
  return (
      <a className={styles.link} href="" onClick={session.logout}>
        <ExitIcon />
        <span className={styles.linkText}>Выход</span>
      </a>
  );
};

export default LogoutButton;
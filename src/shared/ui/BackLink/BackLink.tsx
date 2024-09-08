'use client';
import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './BackLink.module.css';

const BackLink = ({ href }: { href: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
      <>
        <a className={styles.link} onClick={() => router.push(searchParams?.get('previous') || href)}>
          <LeftOutlined />
        </a>
      </>
  );
};

export default BackLink;
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './Button.module.css';
import Link from 'next/link';

interface props {
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

const ButtonNew = ({ children, href, onClick }: props) => {
  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <Button type={'primary'} className={styles.button}>{children}<PlusOutlined /></Button>
      </Link>
    );
  }

  return <Button type={'primary'} className={styles.button} onClick={onClick}>{children}<PlusOutlined /></Button>;
};

export default ButtonNew;
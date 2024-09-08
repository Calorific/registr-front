import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './Button.module.css';
import Link from 'next/link';

interface props {
  children?: React.ReactNode,
  href: string
}

const ButtonNew = ({ children, href }: props) => {
  return (
      <Link href={href} passHref legacyBehavior>
        <Button type={'primary'} className={styles.button}>{children}<PlusOutlined /></Button>
      </Link>
  );
};

export default ButtonNew;
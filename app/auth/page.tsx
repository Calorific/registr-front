import React from 'react';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';


const AuthPage = () => {
  const AuthPage = dynamic(() => import('@/pages_/auth'), { ssr: false, loading: () => <Spin />});

  return (
    <AuthPage />
  );
};
export default AuthPage;
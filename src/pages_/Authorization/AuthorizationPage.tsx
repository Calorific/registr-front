import React from 'react';
import dynamic from 'next/dynamic';

const AuthorizationPage = () => {
  const LoginForm = dynamic(() => import('@/entities/Session/ui/LoginForm'), { ssr: false });
  return (
      <>
        <LoginForm />
      </>
  );
};

export default AuthorizationPage;
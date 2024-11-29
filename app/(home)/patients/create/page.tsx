import React from 'react';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';
import { CreatePatientLayout } from '@/shared/ui/layout/CreatePatientLayout';

const Page = () => {
  const CreatePatientPage = dynamic(() => import('@/pages_/patients/CreatePatient'), { ssr: false, loading: () => <Spin />});

  return (
    <CreatePatientLayout>
      <CreatePatientPage />
    </CreatePatientLayout>
  );
};

export default Page;
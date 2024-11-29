import React from 'react';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';
import { PatientLayout } from '@/shared/ui/layout/PatientLayout';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params, }: PageProps) => {
  const PatientPage = dynamic(() => import('@/pages_/patients/Patient'), { ssr: false, loading: () => <Spin />});

  return (
    <PatientLayout id={params.id}>
      <PatientPage id={params.id} />
    </PatientLayout>
  );
};

export default Page;
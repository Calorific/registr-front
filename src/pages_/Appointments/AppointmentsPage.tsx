import React from 'react';
import dynamic from 'next/dynamic';

const AppointmentsPage = ({ page }: { page: number }) => {
  const AppointmentsList = dynamic(() => import('@/widgets/AppointmentsList/ui/AppointmentsList'), {
    ssr: false,
    loading: () => <div>Загрузка...</div>,
  });
  return (
    <AppointmentsList page={page} />
  );
};

export default AppointmentsPage;
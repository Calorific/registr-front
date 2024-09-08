import React, { Suspense } from 'react';
import AppointmentNew from '@/widgets/Appointment/ui/AppointmentNew';

const AppointmentNewPage = ({ status }: { status: string }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppointmentNew status={status} />
    </Suspense>
  );
};

export default AppointmentNewPage;
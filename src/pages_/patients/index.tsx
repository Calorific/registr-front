'use client';
import React, { useState } from 'react';
import PatientTable from '@/features/PatientsTable/ui/PatientTable';
import { ITableParams } from '@/shared/types/ITableParams';
import ButtonNew from '@/shared/ui/Buttons/ButtonNew';
import { useGetPatients } from '@/shared/api/tableApi';

const PatientsList = ({ page }: { page: number }) => {
  const [patientsTableParams, setPatientsTableParams,] = useState<ITableParams>({
    currentPage: page || 1,
    filters: {},
    sortParams: null,
  });

  const { data, error, isLoading } = useGetPatients(patientsTableParams);

  if (error) {
    return <div>{error.message ?? 'Что-то пошло не так...'}</div>;
  }

  return (
    <>
      <div className="flex justify-between mb-[24px]">
        <div></div>
        <ButtonNew href={'/patients/create'}>Новый пациент</ButtonNew>
      </div>

      <PatientTable
        data={{ ...data, isLoading }}
        tableParams={patientsTableParams}
        setTableParams={setPatientsTableParams}
      />
    </>
  );
};

export default PatientsList;
'use client';
import React, { useState } from 'react';
import { ITableParams } from '@/shared/types/ITableParams';
import ButtonNew from '@/shared/ui/Buttons/ButtonNew';
import AppointmentTable from '@/features/AppointmentsTable/ui/AppointmentTable';
import { useGetAppointments } from '@/shared/api/tableApi';
import { Button, notification } from 'antd';
import { DownloadIcon } from '@/shared/icons';
import axiosInstance from '@/app/axiosProvider/axiosProvider';
import { saveFile } from '@/shared/helpers/saveFile';

const AppointmentsList = ({ page }: { page: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [appointmentsTableParams, setAppointmentsTableParams] = useState<ITableParams>({
    currentPage: page || 1,
    filters: {},
    sortParams: null,
  });

  const { data, error, isLoading: isDataLoading } = useGetAppointments(appointmentsTableParams);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const csv: Blob = await axiosInstance.get('export/csv/all', { responseType: 'blob' }).then(r => new Blob([r.data]));
      saveFile(csv, 'appointments.csv');
    } catch (e: any) {
      notification.error({ message: e?.message})
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>{error.message || 'Что-то пошло не так...'}</div>;
  }

  return (
    <>
      <div className="flex gap-x-[14px] justify-end mb-[24px]">
        <Button type="default" className="my-[5px]" onClick={handleDownload}>
          Скачать CSV
          <DownloadIcon />
        </Button>
        <ButtonNew href={'/appointments/new/'}>Новый прием</ButtonNew>
      </div>

      <AppointmentTable
        data={{ ...data, isLoading: isDataLoading || loading }}
        tableParams={appointmentsTableParams}
        setTableParams={setAppointmentsTableParams}
      />
    </>
  );
};

export default AppointmentsList;
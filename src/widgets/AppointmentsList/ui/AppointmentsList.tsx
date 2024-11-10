'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { ITableParams } from '@/shared/types/ITableParams';
import SearchBar from '@/shared/ui/SearchBar/SearchBar';
import ButtonNew from '@/shared/ui/Buttons/ButtonNew';
import styles from './AppointmentsList.module.css';
import AppointmentTable from '@/features/AppointmentsTable/ui/AppointmentTable';
import { useGetAppointments } from '@/shared/api/tableApi';

const AppointmentsList = ({ page }: { page: number }) => {
  const [
    appointmentsTableParams,
    setAppointmentsTableParams,
  ] = useState<ITableParams>({
        currentPage: page || 1,
        filters: {},
        sortParams: null,
      },
  );

  const [searchValue, setSearchValue] = useState('');
  const { data, error, isLoading } = useGetAppointments(appointmentsTableParams);

  const searchHandler = useCallback(() => {
    setAppointmentsTableParams(
        {
          ...appointmentsTableParams,
          filters: {
            ...appointmentsTableParams.filters,
            fullName: searchValue == '' ? null : [searchValue],
          },
        },
    );
  }, [appointmentsTableParams, searchValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchHandler();
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchValue, searchHandler]);



  const onChangeSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  if (error)
    return <div>Ошибка загрузки</div>;

  return (
    <>
      <h2>Список приемов</h2>
      <div className={styles.container}>
        {/*<SearchBar*/}
        {/*  value={searchValue}*/}
        {/*  onChange={onChangeSearchHandler}*/}
        {/*  onPressEnter={searchHandler}*/}
        {/*/>*/}
        <div></div>

        <ButtonNew href={'/appointments/new/'}>Новый прием</ButtonNew>
      </div>
      <AppointmentTable
        data={{ ...data, isLoading }}
        tableParams={appointmentsTableParams}
        setTableParams={setAppointmentsTableParams}
      />
    </>
  );
};

export default AppointmentsList;
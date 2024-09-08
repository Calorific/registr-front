'use client';
import React, { useEffect, useState } from 'react';
import { IPatientTable } from '@/entities/Patient/model/IPatientTable';
import { ITableParams } from '../../../shared/ui/CustomTable';
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
  const [appointments, setAppointments] = useState<{ data: IPatientTable[], total: number }>({
    data: [],
    total: 0,
  });
  const [searchValue, setSearchValue] = useState('');
  const { data, error, isLoading } = useGetAppointments(appointmentsTableParams);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchHandler();
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const searchHandler = () => {
    setAppointmentsTableParams(
        {
          ...appointmentsTableParams,
          filters: {
            ...appointmentsTableParams.filters,
            fullName: searchValue == '' ? null : [searchValue],
          },
        },
    );
  };

  const onChangeSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };
  if (error) return <div>Ошибка загрузки</div>;
  return (
      <>
        {
          (<>
                <h2>Список приемов</h2>
                <div className={styles.container}>
                  <SearchBar
                      value={searchValue}
                      onChange={onChangeSearchHandler}
                      onPressEnter={searchHandler}
                  />
                  <ButtonNew href={'/appointments/new/'}>Новый прием</ButtonNew>
                </div>
                <AppointmentTable
                    data={{ ...data, isLoading }}
                    tableParams={appointmentsTableParams}
                    setTableParams={setAppointmentsTableParams}
                />
              </>
          )
        }
      </>
  );
};

export default AppointmentsList;
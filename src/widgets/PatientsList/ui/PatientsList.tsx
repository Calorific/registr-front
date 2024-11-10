'use client';
import React, { useCallback, useEffect, useState } from 'react';
import PatientTable from '@/features/PatientsTable/ui/PatientTable';
import { ITableParams } from '@/shared/types/ITableParams';
import SearchBar from '@/shared/ui/SearchBar/SearchBar';
import ButtonNew from '@/shared/ui/Buttons/ButtonNew';
import styles from './PatientsList.module.css';
import { useGetPatients } from '@/shared/api/tableApi';

const PatientsList = ({ page }: { page: number }) => {
  const [patientsTableParams, setPatientsTableParams,] = useState<ITableParams>({
    currentPage: page || 1,
    filters: {},
    sortParams: null,
  });
  const [searchValue, setSearchValue] = useState('');
  const { data, error, isLoading } = useGetPatients(patientsTableParams);

  const searchHandler = useCallback(() => {
    setPatientsTableParams({
      ...patientsTableParams,
      filters: {
        ...patientsTableParams.filters,
        full_name: searchValue == '' ? null : [searchValue],
      },
    });
  }, [patientsTableParams, searchValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchHandler();
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchHandler, searchValue]);

  const onChangeSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  if (error)
    return <div>Ошибка загрузки</div>;

  return (
    <>
      <h2>Список пациентов</h2>
      <div className={styles.container}>
        {/*<SearchBar*/}
        {/*  value={searchValue}*/}
        {/*  onChange={onChangeSearchHandler}*/}
        {/*  onPressEnter={searchHandler}*/}
        {/*/>*/}
        <div></div>
        <ButtonNew href={'/appointments/new/?status=create'}>Новый пациент</ButtonNew>
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
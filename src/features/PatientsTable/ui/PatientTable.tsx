'use client';
import React from 'react';
import { CustomTable, ITableParams } from '@/shared/ui/CustomTable';
import { availablePatientColumns } from '@/features/PatientsTable/config/availablePatientColumns';
import { IPatientTableData } from '@/features/PatientsTable/model/IPatientTableData';
import { savePatientTableColumns, useGetPatientColumns } from '@/features/PatientsTable/api/patientTableApi';
import { Table } from 'antd';
import styles from '@/shared/ui/CustomTable/CustomTable.module.css';


interface props {
  tableParams: ITableParams;

  setTableParams(data: ITableParams): void;

  data: IPatientTableData;
}

const PatientTable = ({ tableParams, setTableParams, data }: props) => {

  const { data: columns, error, isLoading } = useGetPatientColumns();
  if (isLoading) return <div><Table
      className={styles.table}
      pagination={false}
      scroll={{ x: 900, y: 600 }}
      virtual={true}
      size={'middle'}
      bordered={false}
  /></div>;
  if (error) return <div>Ошибка загрузки</div>;
  return (
      <CustomTable
          baseColumns={columns}
          availableColumns={availablePatientColumns}
          data={data}
          tableParams={tableParams}
          setTableParams={setTableParams}
          saveColumns={savePatientTableColumns}
          getRecordLink={(recordId) => `/patients/${recordId}`}
      />
  );
};

export default PatientTable;
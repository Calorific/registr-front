'use client';
import React, { useState } from 'react';
import { Card, Empty, Select, Space, Spin } from 'antd';
import { useGetPatientsByName } from '@/entities/Patient/api/getPatientsByName';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { initAppointment } from '@/entities/Patient/api/initAppointment';

const PatientChoose = () => {
  const [name, setName] = useState('');
  const { patients, isLoading, error, mutate } = useGetPatientsByName(name);
  const router = useRouter();
  const selectHandler = async (value: any) => {
    try {
      const appointmentId = await initAppointment(value.value);
      router.push(`/appointments/${appointmentId}/generalDetails`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
      <Card
          title={'Выбор пациента'}
      >
        <Space size={'large'}>
          ФИО пациента
          <Select
              labelInValue
              filterOption={false}
              value={name}
              style={{ width: 300, border: 'solid #aaa 1px', borderRadius: 20 }}
              showSearch={true}
              onSearch={setName}
              onChange={setName}
              onSelect={selectHandler}
              notFoundContent={isLoading ? <Spin size={'small'} /> : null}
              options={patients?.data.map(patient => ({ label: patient.full_name, value: patient.id })) || <Empty />}
          />
          <Link href={'?status=create'}>
            Новый пациент
          </Link>
        </Space>

      </Card>
  );
};

export default PatientChoose;
'use client';
import React, { CSSProperties, useMemo, useState } from 'react';
import { Button, Card, Empty, Select, Spin } from 'antd';
import { useGetPatientsByName } from '@/entities/Patient/api/getPatientsByName';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { initAppointment } from '@/entities/Patient/api/initAppointment';

const style: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: 16
};

const select: CSSProperties = {
  width: 300,
  border: 'solid #aaa 1px',
  borderRadius: 20,
};

const button: CSSProperties = {
  width: 300,
}


const PatientChoose = () => {
  const [name, setName] = useState('');
  const { patients, mutate } = useGetPatientsByName(name);
  const [patient, setPatient] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const selectHandler = async () => {
    try {
      if (!patient) {
        return;
      }

      setLoading(true);

      const appointmentId = await initAppointment(patient.toString());
      router.push(`/appointments/${appointmentId}/diagnose`);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (confirm('Продолжить с этим пациентом?')) {
      selectHandler().then();
    }
  }

  const options = useMemo(() => {
    return patients?.data.map(patient => ({ label: patient.full_name, value: patient.id })) || <Empty />;
  }, [patients]);

  return (
      <Card title={'Выбор пациента'} loading={loading}>
        <div style={style}>
          <div>
            <div>ФИО пациента</div>
            <Select
              style={select}
              showSearch
              placeholder="Выберите пациента"
              optionFilterProp="label"
              value={patient}
              onChange={value => setPatient(value)}
              options={options}
            />
          </div>

          {patient && (
            <Button style={button} onClick={handleConfirm}>
              Выбрать пациента
            </Button>
          )}

          <Link href={'?status=create'}>
            Новый пациент
          </Link>
        </div>
      </Card>
  );
};

export default PatientChoose;
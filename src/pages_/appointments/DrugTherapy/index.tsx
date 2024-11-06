'use client';

import React, { useState } from 'react';
import { Form, notification, Spin } from 'antd';
import { useSWRConfig } from 'swr';
import {
  drugTherapyCreate, drugTherapyUpdate,
  useGetCurrentDrugTherapyData,
  useGetDrugTherapyFields,
} from '@/entities/Appointment/api/drugTherapyApi';
import { IDrugTherapy } from '@/entities/Appointment/model/IDrugTherapy';
import { Field } from './Field';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { useRouter } from 'next/navigation';
import { NavigationButtons } from '@/features/NavigationButtons';

const DrugTherapyPage = ({ appointmentId }: { appointmentId: string }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();

  const { currentData, isLoading: currentDataIsLoading, } = useGetCurrentDrugTherapyData(appointmentId);
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetDrugTherapyFields();
  const [loading, setLoading] = useState<boolean>(false);

  const formSubmitHandler = async (values: IDrugTherapy) => {
    setLoading(true);

    try {
      const data: {
        medicine_prescriptions: {
          drug_id: number,
          dosa: string,
          note: string
        }[]
      } = { medicine_prescriptions: [] };

      for (const key in values) {
        if (values[key]?.isActive) {
          data.medicine_prescriptions.push({
            dosa: values[key].dosa,
            drug_id: values[key].drug_id,
            note: values[key].note,
          });
        }
      }

      if (!currentData) {
        await drugTherapyCreate(appointmentId, data);
        await mutate({
          key: 'appointments/block/purpose/',
          appointmentId,
        });
      } else {
        await drugTherapyUpdate(appointmentId, data);
      }

      router.push('generalDetails');
      return true;
    } catch (e: any) {
      setLoading(false);
      notification.error({ message: e?.response?.data?.message ?? 'Данные заполнены некорректно' });
    }
  };

  if (fieldsError) {
    return <div>{fieldsError?.message ?? 'Что-то пошло не так...'}</div>;
  }

  if (currentDataIsLoading || fieldsIsLoading || loading) {
    return <Spin />;
  }

  return (
    <Form layout="vertical" form={form} initialValues={currentData} onFinish={formSubmitHandler}>
      {fields.map(field => (
        <Field field={field} key={field.displayName} form={form} />
      ))}

      <NavigationButtons form={form} prevRoute="ekg" btnText="Сохранить и завершить прием" btnClassName="!w-[306px]" />
    </Form>
  );
};

export default DrugTherapyPage;
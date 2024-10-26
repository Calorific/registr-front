'use client';
import React from 'react';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import {
  drugTherapyCreate,
  drugTherapyUpdate,
  useGetCurrentDrugTherapyData, useGetDrugTherapyFields,
} from '@/entities/Appointment/api/drugTherapyApi';
import { Form, notification, Spin } from 'antd';
import { useSWRConfig } from 'swr';
import { IDrugTherapy } from '@/entities/Appointment/model/IDrugTherapy';
import { Field } from './Field';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';

const DrugTherapyForm = ({ appointmentId }: { appointmentId: string }) => {
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();

  const { currentData, isLoading: currentDataIsLoading, } = useGetCurrentDrugTherapyData(appointmentId);
  const { isLoading: statusIsLoading, error: statusError } = useGetAppointmentStatus(appointmentId);
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetDrugTherapyFields();

  const formSubmitHandler = async (values: IDrugTherapy) => {
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
        notification.success({ message: 'Данные успешно обновлены' });
      }
    } catch (e: any) {
      notification.error({ message: e?.response?.data?.message ?? 'Данные заполнены некорректно' });
    }
  };

  if (statusError) {
    return <div>{statusError?.message ?? 'Что-то пошло не так...'}</div>;
  }

  if (fieldsError) {
    return <div>{fieldsError?.message ?? 'Что-то пошло не так...'}</div>;
  }

  if (currentDataIsLoading || statusIsLoading || fieldsIsLoading) {
    return <Spin />;
  }

  return (
    <Form layout="vertical" form={form} initialValues={currentData} onFinish={formSubmitHandler}>
      {fields.map(field => (
        <Field field={field} key={field.displayName} form={form} />
      ))}

      <SubmitButton form={form} className="!w-[306px]">
        Сохранить и завершить прием
      </SubmitButton>
    </Form>
  );
};

export default DrugTherapyForm;
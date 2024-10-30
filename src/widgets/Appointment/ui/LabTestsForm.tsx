'use client';
import React, { Fragment } from 'react';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import {
  labTestsCreate,
  labTestsUpdate,
  useGetCurrentLabTestsData,
  useGetLabTestsFields,
} from '@/entities/Appointment/api/labTestsApi';
import { Card, Col, Form, Input, InputNumber, notification, Row, Spin, Typography } from 'antd';
import { useSWRConfig } from 'swr';
import { DateInput } from '@/shared/ui/Form/DateInput';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { dateFormatConverter } from '@/shared/helpers/dateFormatConverter';

const LabTestsForm = ({ appointmentId }: { appointmentId: string }) => {
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();

  const { currentData, error: currentDataError, isLoading: currentDataIsLoading, } = useGetCurrentLabTestsData(appointmentId);
  const { appointmentStatus, isLoading: statusIsLoading, error: statusError } = useGetAppointmentStatus(appointmentId);
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetLabTestsFields();

  const formSubmitHandler = async (values: any) => {
    try {
      await form.validateFields();
      for (let key in values) {
        if (key.endsWith('date')) {
          values[key] = dateFormatConverter(values[key]);
        }
      }

      if (!currentData) {
        await labTestsUpdate(appointmentId, values);
        notification.success({ message: 'Данные успешно обновлены' });
      } else {
        await labTestsCreate(appointmentId, values);
        await mutate({
          key: 'appointments/block/laboratory_test/',
          appointmentId,
        });
      }


      return true;
    } catch (e: any) {
      notification.error({ message: e?.response?.data?.message ?? 'Данные заполнены некорректно'
    });
      return false;
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
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <div className="flex flex-col gap-y-[24px]">
            <Card title="Анализ крови">
              <Row gutter={[24, 24]}>
                {fields.hormonal_blood_analysis.map((field, i) => (
                  <Fragment key={i}>
                    <Col span={12}>
                      <Form.Item
                        name={field.textName}
                        rules={[{ required: true, message: 'Это поле обязательно' }]}
                        label={field.displayName}
                      >
                        <InputNumber type="number" placeholder="0.0" />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <DateInput label="Дата проведения анализа" name={field.dateName} required />
                    </Col>
                  </Fragment>
                ))}
              </Row>
            </Card>

            <Card title="Общий анализ крови" extra={<DateInput name="general_date" />}>
              <Row gutter={[24, 24]}>
                {fields.general_blood_analysis.map((field, i) => (
                  <Col span={12} key={i}>
                    <Form.Item
                      label={field.displayName}
                      name={field.textName}
                    >
                      <InputNumber type="number" placeholder="0.0" />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </Card>
          </div>
        </Col>

        <Col span={12}>
          <Card title="Биохимический анализ крови" className="h-full" extra={<DateInput name="hormonal_date" />}>
            <Row gutter={[24, 6]}>
              {fields.blood_chemistry.map((field, i) => (
                <Col span={12} key={i}>
                  <Form.Item
                    label={field.displayName}
                    name={field.textName}
                  >
                    <InputNumber type="number" placeholder="0.0" />
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Общий анализ мочи" extra={<DateInput name="date" /> }>
            <Row gutter={[24, 24]}>
              {fields.general_urine_analysis.map((field, i) => (
                <Col span={12} key={i}>
                  <Form.Item
                    label={field.displayName}
                    name={field.textName}
                  >
                    <Input placeholder={field.displayName} />
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      <SubmitButton form={form}>
        Далее
      </SubmitButton>
    </Form>
  );
};

export default LabTestsForm;
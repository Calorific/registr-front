'use client';
import React, { useEffect, useState } from 'react';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import { Card, Checkbox, Col, Form, Input, InputNumber, notification, Row, Spin, Typography } from 'antd';
import { ekgCreate, ekgUpdate, useGetCurrentEkgData, useGetEkgFields } from '@/entities/Appointment/api/ekgsApi';
import { useSWRConfig } from 'swr';
import { IEkg } from '@/entities/Appointment/model/IEkg';
import { dateFormatConverter } from '@/shared/helpers/dateFormatConverter';
import { DateInput } from '@/shared/ui/Form/DateInput';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';

const EkgForm = ({ appointmentId }: { appointmentId: string }) => {
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();

  const { currentData, error: currentDataError, isLoading: currentDataIsLoading } = useGetCurrentEkgData(appointmentId);
  const { appointmentStatus, isLoading: statusIsLoading, error: statusError } = useGetAppointmentStatus(appointmentId);
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetEkgFields();

  const formSubmitHandler = async (values: IEkg) => {
    try {
      await form.validateFields();
      values.date_ekg = dateFormatConverter(values.date_ekg);
      values.date_echo_ekg = dateFormatConverter(values.date_echo_ekg);

      if (!currentData) {
        await ekgUpdate(appointmentId, values);
        notification.success({ message: 'Данные успешно обновлены' });
      } else {
        await ekgCreate(appointmentId, values);
        await mutate({
          key: 'appointments/block/ekg/',
          appointmentId,
        });
      }

      return true;
    } catch (e: any) {
      notification.error({ message: e?.response?.data?.message ?? 'Данные заполнены некорректно' });
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
    <Form layout="vertical" className="[&_.ant-card-body]:!flex [&_.ant-card-body]:!flex-col [&_.ant-card-body]:!h-full" form={form} initialValues={currentData} onFinish={formSubmitHandler}>
      <Row gutter={24}>
        <Col span={8}>
          <Card className="h-full flex flex-col" title="ЭКГ" extra={<DateInput required name="date_ekg" />}>
            {fields.ekg.map(field => (
              <Form.Item
                key={field.name}
                name={field.name}
                valuePropName={'checked'}
              >
                <Checkbox>{field.displayName}</Checkbox>
              </Form.Item>
            ))}

            <Form.Item
              className="w-full grow-[1] mt-[24px] [&_.ant-row]:!h-full [&_.ant-form-item-control-input]:!h-full [&_.ant-form-item-control-input-content]:!h-full"
              name={'another_changes'}
              label="Другие изменения:"
            >
              <Input.TextArea className="w-full !h-full" rows={3} placeholder="Введите комментарий..." />
            </Form.Item>
          </Card>
        </Col>

        <Col span={16}>
          <Card className="h-full" title="ЭХО-КГ" extra={<DateInput required name="date_echo_ekg" />}>
            <Row gutter={[24, 24]}>
              <Col span={16}>
                <Row gutter={[24, 14]}>
                  {fields.echo_ekg.integer_fields.map((field, i) => (
                    <Col span={12} key={i}>
                      <Form.Item
                        label={field.displayName}
                        required={field.displayName === 'ФВ'}
                        name={field.name}
                        rules={[{ required: field.displayName === 'ФВ', message: 'Это поле обязательно' }]}
                      >
                        <InputNumber type="number" className="w-full" placeholder="0.0" />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </Col>

              <Col span={8}>
                <div className="flex flex-col gap-y-[5px]">
                  {fields.echo_ekg.boolean_fields.map(field => (
                    <Form.Item
                      key={field.name}
                      name={field.name}
                      valuePropName={'checked'}
                    >
                      <Checkbox>{field.displayName}</Checkbox>
                    </Form.Item>
                  ))}
                </div>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="note"
                  label="Заключение:"
                >
                  <Input.TextArea rows={3} placeholder="Введите комментарий..." className="w-full" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>

        <SubmitButton form={form}>
          Далее
        </SubmitButton>
      </Row>
    </Form>
  );
};

export default EkgForm;
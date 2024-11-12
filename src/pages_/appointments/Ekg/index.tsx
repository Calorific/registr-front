'use client';

import React, { useState } from 'react';
import { Card, Checkbox, Col, Form, Input, InputNumber, notification, Row, Spin } from 'antd';
import { ekgCreate, ekgUpdate, useGetCurrentEkgData, useGetEkgFields } from '@/entities/Appointment/api/ekgsApi';
import { useSWRConfig } from 'swr';
import { IEkg } from '@/entities/Appointment/model/IEkg';
import { dateFormatConverter } from '@/shared/helpers/dateFormatConverter';
import { DateInput } from '@/shared/ui/Form/DateInput';
import { useRouter } from 'next/navigation';
import { NavigationButtons } from '@/features/NavigationButtons';
import { DimensionInput } from '@/pages_/appointments/Ekg/DimensionInput';
import { Info } from './Info';

const EkgPage = ({ appointmentId }: { appointmentId: string }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();

  const { currentData, isLoading: currentDataIsLoading } = useGetCurrentEkgData(appointmentId);
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetEkgFields();
  const [loading, setLoading] = useState<boolean>(false);

  const formSubmitHandler = async (values: IEkg) => {
    setLoading(true);

    try {
      await form.validateFields();
      values.date_ekg = dateFormatConverter(values.date_ekg);
      values.date_echo_ekg = dateFormatConverter(values.date_echo_ekg);

      if (!currentData) {
        await ekgCreate(appointmentId, values);
      } else {
        await ekgUpdate(appointmentId, values);
      }

      await mutate({
        key: 'appointments/block/ekg/',
        appointmentId,
      });

      await mutate({
        key: 'appointments/',
        appointmentId,
      });

      router.push('drugTherapy');
      return true;
    } catch (e: any) {
      setLoading(false);
      notification.error({ message: e?.message ?? 'Данные заполнены некорректно' });
      return false;
    }
  };

  if (fieldsError) {
    return <div>{fieldsError?.message ?? 'Что-то пошло не так...'}</div>;
  }

  if (currentDataIsLoading || fieldsIsLoading || loading) {
    return <Spin />;
  }

  console.log(currentData)

  return (
    <Form layout="vertical" className="[&_.ant-card-body]:!flex [&_.ant-card-body]:!flex-col [&_.ant-card-body]:!h-full" form={form} initialValues={currentData} onFinish={formSubmitHandler}>
      <Row gutter={24}>
        <Col span={8}>
          <Card className="h-full flex flex-col" title="ЭКГ" extra={<DateInput name="date_ekg" required={false} />}>
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
              name="another_changes"
              label="Другие изменения:"
              rules={[{ max: 500, message: 'Значение не должно превышать 500 символов', }]}
            >
              <Input.TextArea className="w-full !h-full" rows={3} placeholder="Введите комментарий..." />
            </Form.Item>
          </Card>
        </Col>

        <Col span={16}>
          <Card
            className="h-full"
            title={<div className="flex gap-x-[14px] items-center">ЭХО-КГ <Info /></div>}
            extra={<DateInput name="date_echo_ekg" required={false} />}
          >
            <Row gutter={[24, 24]}>
              <Col span={16}>
                <Row gutter={[24, 14]}>
                  {fields.echo_ekg.float_fields.map((field, i) => (
                    <Col span={12} key={i}>
                      {!!field.secondName ? (
                        <DimensionInput field={field} form={form} />
                      ) : (
                        <Form.Item
                          label={field.displayName}
                          required={field.name === 'fv'}
                          name={field.name}
                          rules={[{ required: field.name === 'fv', message: 'Это поле обязательно' }]}
                        >
                          <InputNumber type="number" className="w-full" placeholder="0.0" />
                        </Form.Item>
                      )}
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
                  rules={[{ max: 1000, message: 'Значение не должно превышать 1000 символов', }]}
                >
                  <Input.TextArea rows={3} placeholder="Введите комментарий..." className="w-full" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <NavigationButtons form={form} prevRoute="labTests" />
    </Form>
  );
};

export default EkgPage;
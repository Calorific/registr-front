import React, { Dispatch, useState } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, message, Row, Select, Space, Spin } from 'antd';
import {
  drugTherapyCreate,
  drugTherapyUpdate,
  useGetDrugTherapyFields,
} from '@/entities/Appointment/api/drugTherapyApi';
import { IDrugTherapy } from '@/entities/Appointment/model/IDrugTherapy';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { IDrugTherapyFields } from '@/entities/Appointment/model/IFormDataFields';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/navigation';

interface DrugTherapyEditProps {
  status: FormStatus;
  setStatus: Dispatch<FormStatus>;
  appointmentId: string;
  data: any;
}

const DrugTherapyEdit = ({ status, setStatus, appointmentId, data }: DrugTherapyEditProps) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [form] = Form.useForm();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetDrugTherapyFields();
  const [messageApi, contextHolder] = message.useMessage();

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
      if (status === 'create') {
        await drugTherapyCreate(appointmentId, data);
        await mutate({
          key: 'appointments/block/purpose/',
          appointmentId,
        });
        setStatus('edit');
      } else {
        await drugTherapyUpdate(appointmentId, data);
        messageApi.success('Данные успешно обновлены');
        setStatus('display');
      }
    } catch (e: any) {
      messageApi.error(e?.response?.data?.message ?? 'Данные заполнены некорректно');
    }
  };
  if (fieldsError) return <div>Ошибка загрузки</div>;
  if (fieldsIsLoading) return <Spin></Spin>;

  data ??= {}

  return (
    <Form
      form={form}
      layout={'inline'}
      onFinish={formSubmitHandler}
    >
      <Card
        title={'Лекарственная терапия'}
        extra={
          <Space>
            <Form.Item>
              <Button onClick={() => router.push(`/appointments/${appointmentId}/ekg`)}>
                Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <SubmitButton form={form}>
                Сохранить
              </SubmitButton>
            </Form.Item>
            <Form.Item>
              <Button onClick={() => router.push(`/appointments/${appointmentId}/generalDetails`)}>
                Закончить прием
              </Button>
            </Form.Item>
          </Space>
        }
      >
        {contextHolder}
        <Card title={'Лекарственная терапия'}>
          <Row gutter={[32, 16]}>
            {fields.map(field => (
              <DrugTherapyField field={field} data={data} key={field.displayName} />
            ))}
          </Row>
          <span>Примечание:</span>
          <Form.Item
            style={{ width: '100%' }}
            name={'note'}
            initialValue={data.note}
          >
            <Input.TextArea />
          </Form.Item>
        </Card>
      </Card>
    </Form>
  );
};


const DrugTherapyField = ({ field, data }: { field: IDrugTherapyFields, data: any }) => {
  const [isActive, setIsActive] = useState(!!data[field.displayName]);
  data ??= {}

  return (
    <Form.List name={field.displayName} key={field.displayName}>
      {() =>
        <Col span={24}>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item
                name={'isActive'}
                valuePropName={'checked'}
                initialValue={!!data[field.displayName]}
              >
                <Checkbox
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                >{field.displayName}</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Space>
                <Form.Item
                  style={{ width: 200 }}
                  name={'drug_id'}
                  rules={[{ required: isActive }]}
                  initialValue={data[field.displayName]?.id}
                >
                  <Select
                    disabled={!isActive}
                    options={field.medicine_prescriptions.map(data => ({
                      label: data.displayName,
                      value: data.id,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  name={'dosa'}
                  label={'Доза'}
                  rules={[{ required: isActive }]}
                  initialValue={data[field.displayName]?.dosa}
                >
                  <Input disabled={!isActive} style={{ width: 150 }} />
                </Form.Item>
                <Form.Item
                  name={'note'}
                  label={'Примечание'}
                  initialValue={data[field.displayName]?.note || ''}
                >
                  <Input disabled={!isActive} />
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </Col>
      }
    </Form.List>
  );
};

export default DrugTherapyEdit;
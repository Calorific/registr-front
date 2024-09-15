import React, { Dispatch } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, message, Row, Space, Spin } from 'antd';
import { complaintsCreate, complaintsUpdate, useGetComplaintsFields } from '@/entities/Appointment/api/complaintsApi';
import { IComplaints } from '@/entities/Appointment/model/IComplaints';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { useSuccessMessage } from '@/shared/hooks/useSuccessMessage';
import { useSWRConfig } from 'swr';
import { useValidation } from '@/shared/hooks/useValidation';
import { useRouter } from 'next/navigation';

interface ComplaintsEditProps {
  status: FormStatus;
  setStatus: Dispatch<FormStatus>;
  appointmentId: string;
  data: IComplaints;
}

const ComplaintsEdit = ({ status, setStatus, appointmentId, data }: ComplaintsEditProps) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetComplaintsFields();
  const [messageApi, contextHolder] = message.useMessage();
  const weight = Form.useWatch('weight', form);
  const height = Form.useWatch('height', form);
  const [isValid, handleValidation] = useValidation(form);

  useSuccessMessage();

  const formSubmitHandler = async (values: IComplaints) => {
    values['heart_failure_om'] = true;

    try {
      await form.validateFields();

      values.bmi = (weight / Math.pow((height / 100), 2)).toFixed(2);

      if (status !== 'edit') {
        await complaintsCreate(appointmentId, values);
        await mutate({
          key: 'appointments/block/complaint/',
          appointmentId,
        });
        await mutate({
          key: 'appointments/block/clinical_condition/',
          appointmentId,
        });
        setStatus('edit');
      } else {
        await complaintsUpdate(appointmentId, values);
        messageApi.success('Данные успешно обновлены');
        setStatus('edit');
      }

      return true;
    } catch (e: any) {
      messageApi.error(e?.response?.data?.message ?? 'Данные заполнены некорректно');
      return false;
    }
  };

  const handleNext = async () => {
    const res = await formSubmitHandler(form.getFieldsValue());
    if (res) {
      router.push(`/appointments/${appointmentId}/ekg?m=success`);
    }
  }

  if (fieldsError) return <div>Ошибка загрузки</div>;
  if (fieldsIsLoading) return <Spin />;

  data ??= {} as any
  const conditions = fields.conditions.filter(c => c.displayName !== 'Ясные глаза');

  return (
    <Form
      form={form}
      layout={'inline'}
      onFinish={formSubmitHandler}
      onChange={handleValidation}
    >
      <Card
        title={'Жалобы'}
        extra={
          <Space>
            <Form.Item>
              <Button onClick={() => router.push(`/appointments/${appointmentId}/labTests`)}>
                Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <SubmitButton form={form}>
                Сохранить
              </SubmitButton>
            </Form.Item>
            <Form.Item>
              <Button disabled={!isValid} onClick={handleNext}>
                Далее
              </Button>
            </Form.Item>
          </Space>
        }
      >
        {contextHolder}
        <Row gutter={32}>
          <Col span={10}>
            <Space style={{ width: '100%' }} direction={'vertical'} size={'middle'}>
              <Card>
                <Space direction={'vertical'} size={'middle'} style={{ display: 'flex' }}>
                  <Form.Item
                    label={'Рост'}
                    name={'height'}
                    rules={[{ required: true, message: 'Укажите рост' }]}
                    initialValue={data.height}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    label={'Вес'}
                    name={'weight'}
                    rules={[{ required: true, message: 'Укажите вес' }]}
                    initialValue={data.weight}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    label={'ИМТ'}
                    name={'bmi'}
                    initialValue={data.bmi}
                  >
                    <Input style={{ display: 'none', }} />
                    {((weight || 0) / Math.pow(((height || 1) / 100), 2)).toFixed(2) || '-'}
                  </Form.Item>
                  <Form.Item
                    label={'Систолическое АД'}
                    name={'systolic_bp'}
                    rules={[{ required: true, message: 'Укажите систолическое АД' }]}
                    initialValue={data.systolic_bp}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    label={'Диастолическое АД'}
                    name={'diastolic_bp'}
                    rules={[{ required: true, message: 'Укажите диастолическое АД' }]}
                    initialValue={data.diastolic_bp}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    label={'ЧСС'}
                    name={'heart_rate'}
                    rules={[{ required: true, message: 'Укажите ЧСС' }]}
                    initialValue={data.heart_rate}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    label={'Дистанция 6-минутной ходьбы'}
                    name={'six_min_walk_distance'}
                    rules={[{ required: true, message: 'Укажите дистанцию 6-минутной ходьбы' }]}
                    initialValue={data.six_min_walk_distance}
                  >
                    <InputNumber />
                  </Form.Item>
                </Space>
              </Card>
              <Card title={'Жалобы'}>
                {fields.complaints.map(field => (
                  <Form.Item
                    key={field.name}
                    name={field.name}
                    valuePropName={'checked'}
                    initialValue={data[field.name]}
                  >
                    <Checkbox>{field.displayName}</Checkbox>
                  </Form.Item>
                ))}
                <span>Примечание:</span>
                <Form.Item
                  name={'note'}
                  initialValue={data.note ?? ''}
                >
                  <Input.TextArea />
                </Form.Item>
              </Card>
            </Space>
          </Col>
          <Col span={14}>
            <Card title={'Клиническое состояние'}>
              <Row>
                {conditions.map(field => (
                  <Col span={12} key={field.name}>
                    <Form.Item
                      name={field.name}
                      valuePropName={'checked'}
                      initialValue={data[field.name]}
                    >
                      <Checkbox>{field.displayName}</Checkbox>
                    </Form.Item>
                  </Col>
                ))}
              </Row>

              <span>Примечание:</span>
              <Form.Item
                name={'other_symptoms'}
                initialValue={data.other_symptoms ?? ''}
              >
                <Input.TextArea />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default ComplaintsEdit;
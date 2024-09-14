import React, { Dispatch, Fragment } from 'react';
import { Button, Card, Col, Form, Input, message, Row, Space, Spin } from 'antd';
import { labTestsCreate, labTestsUpdate, useGetLabTestsFields } from '@/entities/Appointment/api/labTestsApi';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { dateFormatConverter } from '@/shared/helpers/dateFormatConverter';
import { DateInput } from '@/shared/ui/Form/DateInput';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/navigation';
import { useSuccessMessage } from '@/shared/hooks/useSuccessMessage';
import { useValidation } from '@/shared/hooks/useValidation';

interface LabTestsEditProps {
  setStatus: Dispatch<FormStatus>;
  appointmentId: string;
  data: any;
  status: FormStatus;
}

const LabTestsEdit = ({ status, setStatus, appointmentId, data }: LabTestsEditProps) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetLabTestsFields();
  const [messageApi, contextHolder] = message.useMessage();
  const [isValid, handleValidation] = useValidation(form);

  useSuccessMessage();

  const formSubmitHandler = async (values: any) => {
    try {
      for (let key in values) {
        if (key.endsWith('date')) {
          values[key] = dateFormatConverter(values[key]);
        }
      }

      if (status === 'edit') {
        await labTestsUpdate(appointmentId, values);
        messageApi.success('Данные успешно обновлены');
      } else {
        await labTestsCreate(appointmentId, values);
        await mutate({
          key: 'appointments/block/laboratory_test/',
          appointmentId,
        });
      }

      setStatus('display');

      return true;
    } catch (e: any) {
      messageApi.error(JSON.stringify(e?.response?.data?.message ?? 'Данные заполнены некорректно'));
      return false;
    }
  };

  const handleNext = async () => {
    const res = await formSubmitHandler(form.getFieldsValue());
    if (res) {
      router.push(`/appointments/${appointmentId}/complaints?m=success`);
    }
  }

  if (fieldsError) return <div>Ошибка загрузки</div>;
  if (fieldsIsLoading) return <Spin />;

  data ??= {}

  return (
    <Form
      form={form}
      layout={'inline'}
      onFinish={formSubmitHandler}
      onChange={handleValidation}
    >
      <Card
        title={'Лабораторные тесты'}
        extra={
          <Space>
            <Form.Item>
              <Button onClick={() => router.push(`/appointments/${appointmentId}/diagnose`)}>
                Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <SubmitButton form={form}>
                Сохранить
              </SubmitButton>
            </Form.Item>

            <Button onClick={handleNext} disabled={!isValid}>
              Далее
            </Button>
          </Space>
        }
      >
        {contextHolder}
        <Row gutter={[32, 16]} align={'middle'}>
          <Col span={12}>
            <Space direction={'vertical'} size={'middle'}>
              <Card title={'Гормональный анализ крови'}>
                <Row gutter={[32, 16]}>
                  {fields.hormonal_blood_analysis.map((field, i) => (
                    <Fragment key={i}>
                      <Col span={5}>
                        {field.displayName}:
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          name={field.textName}
                          initialValue={data[field.textName]}
                          rules={[{ required: true, message: 'заполните поле' }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <DateInput initialValue={data[field.dateName]} label="Дата" name={field.dateName} />
                      </Col>
                    </Fragment>
                  ))}
                </Row>
              </Card>
              <Card title={'Общий анализ крови'}>
                <Row gutter={[32, 16]}>
                  {fields.general_blood_analysis.map((field, i) => (
                    <Fragment key={i}>
                      <Col span={5}>
                        {field.displayName}:
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          name={field.textName}
                          initialValue={data[field.textName]}
                          rules={[{ required: true, message: 'заполните поле' }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <DateInput initialValue={data[field.dateName]} label="Дата" name={field.dateName} />
                      </Col>
                    </Fragment>
                  ))}
                </Row>
              </Card>
            </Space>
          </Col>
          <Col span={12}>
            <Card title={'Общий анализ мочи'}>
              <Row gutter={[32, 16]}>
                {fields.general_urine_analysis.map((field, i) => (
                  <Fragment key={i}>
                    <Col span={6}>
                      {field.displayName}:
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        name={field.textName}
                        initialValue={data[field.textName]}
                        rules={[{ required: true, message: 'заполните поле' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <DateInput initialValue={data[field.dateName]} label="Дата" name={field.dateName} />
                    </Col>
                  </Fragment>
                ))}
              </Row>
            </Card>
          </Col>
          <Col>
            <Card title={'Биохимический анализ крови'}>
              <Row gutter={[32, 16]}>
                {fields.blood_chemistry.map(field => (
                  <Col span={12} key={field.textName}>
                    <Row gutter={32}>
                      <Col span={4}>
                        {field.displayName}:
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={field.textName}
                          initialValue={data[field.textName]}
                          rules={[{ required: true, message: 'заполните поле' }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <DateInput initialValue={data[field.dateName]} label="Дата" name={field.dateName} />
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <span>Примечание:</span>
            <Form.Item
              style={{ width: '100%' }}
              name={'note'}
              initialValue={data.note}
            >
              <Input.TextArea style={{ height: 100 }} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default LabTestsEdit;
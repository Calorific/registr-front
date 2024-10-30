import React, { CSSProperties, Dispatch } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, message, Row, Space, Spin } from 'antd';
import { ekgCreate, ekgUpdate, useGetEkgFields } from '@/entities/Appointment/api/ekgsApi';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { dateFormatConverter } from '@/shared/helpers/dateFormatConverter';
import { IEkg } from '@/entities/Appointment/model/IEkg';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { useValidation } from '@/shared/hooks/useValidation';
import { useSuccessMessage } from '@/shared/hooks/useSuccessMessage';
import { DateInput } from '@/shared/ui/Form/DateInput';

interface EkgEditProps {
  status: FormStatus;
  setStatus: Dispatch<FormStatus>,
  appointmentId: string,
  data: any
}

const s: { [key: string]: CSSProperties } = {
  wFull: {
    width: '100%',
  },
  hFull: {
    height: '100%',
  },
  pt15: {
    paddingTop: 15,
  },
  space: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16
  }
};

const EkgEdit = ({ status, setStatus, appointmentId, data }: EkgEditProps) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetEkgFields();
  const [messageApi, contextHolder] = message.useMessage();
  const [isValid, handleValidation] = useValidation(form);

  useSuccessMessage();

  const formSubmitHandler = async (values: IEkg) => {
    try {
      await form.validateFields();
      values.date_ekg = dateFormatConverter(values.date_ekg);
      values.date_echo_ekg = dateFormatConverter(values.date_echo_ekg);

      if (status === 'edit') {
        await ekgUpdate(appointmentId, values);
        messageApi.success('Данные успешно обновлены');
      } else {
        await ekgCreate(appointmentId, values);
        await mutate({
          key: 'appointments/block/ekg/',
          appointmentId,
        });
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
      router.push(`/appointments/${appointmentId}/drugTherapy?m=success`);
    }
  }

  if (fieldsError) return <div>Ошибка загрузки</div>;
  if (fieldsIsLoading) return <Spin />;

  data ??= {}

  return (
    <Form
      form={form}
      onFinish={formSubmitHandler}
      onChange={handleValidation}
    >
      <Card
        style={s.wFull}
        title={'ЭКГ и Эхо-КГ'}
        extra={
          <Space>
            <Form.Item>
              <Button onClick={() => router.push(`/appointments/${appointmentId}/complaints`)}>
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
        <Row gutter={20}>
          <Col span={12}>
            <Card
              title={'ЭКГ'}
              extra={
                <div style={s.pt15}>
                  <DateInput type="MASKED" initialValue={data.date_ekg} label="Дата" name="date_ekg" />
                </div>
              }
            >
              <div style={s.space}>
                {fields.ekg.map(field => (
                  <Form.Item
                    key={field.name}
                    name={field.name}
                    valuePropName={'checked'}
                    initialValue={data[field.name]}
                  >
                    <Checkbox>{field.displayName}</Checkbox>
                  </Form.Item>
                ))}
                <span>Другие изменения:</span>
                <Form.Item
                  style={s.wFull}
                  name={'another_changes'}
                  initialValue={data?.another_changes}
                >
                  <Input.TextArea style={{ width: '100%', }} />
                </Form.Item>
              </div>
            </Card>
          </Col>

          <Col span={12}>
            <Card
              title={'Эхо-КГ'}
              style={s.hFull}
              extra={
                <div style={s.pt15}>
                  <DateInput type="MASKED" initialValue={data.date_echo_ekg} label="Дата" name="date_echo_ekg" />
                </div>
              }
            >
              <Row gutter={32}>
                <Col span={12}>
                  <Row gutter={[32, 16]}>
                    {fields.echo_ekg.float_fields.map(field => (
                      <>
                        <Col span={10}>
                          <span style={{ color: 'red', }}>*{' '}</span>{field.displayName}:
                        </Col>
                        <Col span={14}>
                          <Form.Item
                            name={field.name}
                            initialValue={data[field.name]}
                            rules={[{ required: true, message: 'Заполните поле' }]}
                          >
                            <InputNumber type="number" />
                          </Form.Item>
                        </Col>
                      </>
                    ))}
                  </Row>
                </Col>
                <Col span={12}>
                  <Space
                    direction={'vertical'}
                    size={'middle'}
                  >
                    {fields.echo_ekg.boolean_fields.map(field => (
                      <Form.Item
                        key={field.name}
                        name={field.name}
                        valuePropName={'checked'}
                        initialValue={data[field.name]}
                      >
                        <Checkbox>{field.displayName}</Checkbox>
                      </Form.Item>
                    ))}
                  </Space>
                </Col>
              </Row>
              <span>Примечание:</span>
              <Form.Item
                style={s.wFull}
                name={'note'}
                initialValue={data.note}
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

export default EkgEdit;
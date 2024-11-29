import React, { FC, memo } from 'react';
import { LabTestFields } from '@/entities/Appointment/model/ILabTestsFields';
import { Card, Col, Form, FormInstance, Input, InputNumber, Row } from 'antd';
import { CardDateInput } from '@/pages_/appointments/LabTests/CardDateInput';

interface FieldCardProps {
  title: string;
  fieldType: 'string' | 'number';
  fields: LabTestFields;
  gutter: [number, number];
  form: FormInstance;
  className?: string;
  loading: boolean;
}

const _FieldCard: FC<FieldCardProps> = ({ title, fields, fieldType, gutter, form, className, loading }) => {

  return (
    <Card
      title={title}
      extra={<CardDateInput fields={fields.fields} form={form} name={fields.dateName} />}
      className={className}
      loading={loading}
    >
      <Row gutter={gutter}>
        {fields.fields.map((field, i) => (
          <Col span={12} key={i}>
            <Form.Item
              label={field.displayName}
              name={field.textName}
              rules={fieldType === 'string' ? [{ max: 30, message: 'Строка не должна превышать 30 символов'}] : []}
            >
              {fieldType === 'number'
                ? <InputNumber type="number" placeholder="0.0" />
                : <Input placeholder={field.displayName} />
              }
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export const FieldCard = memo(_FieldCard);

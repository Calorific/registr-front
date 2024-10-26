import { IDrugTherapyFields } from '@/entities/Appointment/model/IFormDataFields';
import React from 'react';
import { Checkbox, Col, Form, FormInstance, Input, Row, Select } from 'antd';

export const Field = ({ field, form }: { field: IDrugTherapyFields, form: FormInstance }) => {

  const checked = Form.useWatch([field.displayName, 'isActive'], form);

  return (
    <Col span={24}>
      <Row gutter={32}>
        <Col span={6}>
          <Form.Item
            name={[field.displayName, 'isActive']}
            valuePropName={'checked'}
            className="mt-[-3px] !pb-[3px]"
            initialValue={!!form.getFieldValue([field.displayName, 'dosa'])}
          >
            <Checkbox>
              {field.displayName}
            </Checkbox>
          </Form.Item>
          <Form.Item
            className="mt-[-7px]"
            name={[field.displayName, 'drug_id']}
            rules={[{ required: checked, message: 'Укажите лекарство', }]}
          >
            <Select
              placeholder={field.displayName}
              disabled={!checked}
              options={field.medicine_prescriptions.map(data => ({
                label: data.displayName,
                value: data.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            name={[field.displayName, 'dosa']}
            label={'Доза'}
            rules={[{ required: checked, message: 'Укажите дозу', }]}
          >
            <Input placeholder="мг" disabled={!checked} style={{ width: 150 }} />
          </Form.Item>
        </Col>

        <Col span={15}>
          <Form.Item
            name={[field.displayName, 'note']}
            label={'Примечание'}
          >
            <Input placeholder="Введите комментарий..." disabled={!checked} />
          </Form.Item>
        </Col>
      </Row>
    </Col>
  );
};
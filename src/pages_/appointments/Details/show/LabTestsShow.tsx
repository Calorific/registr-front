import React, { FC, memo } from 'react';
import { Card, Col, Row } from 'antd';
import { Field } from '@/pages_/appointments/Details/Field';
import { Empty } from '@/shared/ui/Empty';
import { ILabTestsFields } from '@/entities/Appointment/model/ILabTestsFields';

interface ComplaintsShowProps {
  data: any;
  fields: ILabTestsFields;
}

const _LabTestsShow: FC<ComplaintsShowProps> = ({ data, fields }) => {
  if (!data) {
    return <Empty />
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={12}>
        <Card title="Анализ крови">
          {fields.hormonal_blood_analysis.map((field, i) => (
            <div key={i} className="flex justify-between">
              <Field variant="INLINE" name={field.displayName} value={data[field.textName]} />

              <p className="text-[16px] text-[#B4B4B4]">{data[field.dateName]}</p>
            </div>
          ))}
        </Card>
      </Col>

      <Col span={12}>
        <Card title="Биохимический анализ крови" extra={<p className="text-[16px] text-[#B4B4B4]">{data[fields.blood_chemistry.dateName] ?? '-'}</p>}>
          <Row gutter={[0, 5]}>
            {fields.blood_chemistry.fields.map((field, i) => (
              <Col key={i} span={6}>
                <div  className="flex justify-between">
                  <Field variant="INLINE" name={field.displayName} value={data[field.textName]} />

                  <p className="text-[16px] text-[#B4B4B4]">{data[field.dateName]}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>

      <Col span={7}>
        <Card title="Общий анализ крови" extra={<p className="text-[16px] text-[#B4B4B4]">{data[fields.general_blood_analysis.dateName] ?? '-'}</p>}>
          <Row gutter={[0, 5]}>
            {fields.general_blood_analysis.fields.map((field, i) => (
              <Col key={i} span={24}>
                <div  className="flex justify-between">
                  <Field variant="INLINE" name={field.displayName} value={data[field.textName]} />

                  <p className="text-[16px] text-[#B4B4B4]">{data[field.dateName]}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>

      <Col span={17}>
        <Card title="Общий анализ мочи" extra={<p className="text-[16px] text-[#B4B4B4]">{data[fields.general_urine_analysis.dateName] ?? '-'}</p>}>
          <Row gutter={[0, 5]}>
            {fields.general_urine_analysis.fields.map((field, i) => (
              <Col key={i} span={12}>
                <div  className="flex justify-between">
                  <Field variant="INLINE" name={field.displayName} value={data[field.textName]} />

                  <p className="text-[16px] text-[#B4B4B4]">{data[field.dateName]}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card title="Примечание">
          <p className="text-[16px] text-[#232323]">
            {data.note}
          </p>
        </Card>
      </Col>
    </Row>
  );
}

export const LabTestsShow = memo(_LabTestsShow);

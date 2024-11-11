import React, { FC, memo } from 'react';
import { Card, Col, Row } from 'antd';
import { Field } from '@/pages_/appointments/Details/Field';
import { Empty } from '@/shared/ui/Empty';
import { IBooleanFields } from '@/entities/Appointment/model/IFormDataFields';
import { Point } from '@/shared/ui/Point';

interface ComplaintsShowProps {
  data: any;
  fields: {
    complaints: IBooleanFields[],
    conditions: IBooleanFields[]
  }
}

const _ComplaintsShow: FC<ComplaintsShowProps> = ({ data, fields }) => {
  if (!Object.keys(data ?? {}).length) {
    return <Empty />
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={12}>
        <Card title="Витальные показатели" className="h-full">
          <Row gutter={[5, 10]}>
            <Col span={10}>
              <Field name="Рост" value={data.height} />
            </Col>
            <Col span={10}>
              <Field name="Вес" value={data.weight} />
            </Col>
            <Col span={4} className="flex justify-end">
              <div className=" border border-solid border-blue rounded-full p-[10px] text-blue h-[42px] whitespace-nowrap">
                ИМТ {+data.bmi ? data.bmi.toFixed(1).padStart(4, '0') : '-'}
              </div>
            </Col>

            <Col span={10}>
              <Field name="Систолическое АД" value={data.systolic_bp} />
            </Col>
            <Col span={14}>
              <Field name="ЧСС" value={data.heart_rate} />
            </Col>
            <Col span={10}>
              <Field name="Диастолическое АД" value={data.diastolic_bp} />
            </Col>
            <Col span={14}>
              <Field name="Дистанция 6-минутной ходьбы" value={data.six_min_walk_distance} />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={12}>
        <Card title="Жалобы" className="h-full">
          <p className="text-[14px] text-[#B4B4B4]">Жалобы пациента:</p>
          <div className="flex flex-wrap gap-x-[24px] gap-y-[7px] mb-[24px]">
            {fields.complaints?.filter(f => !!data[f.name]).map((field, i) => (
              <Point name={field.displayName} key={i} />
            ))}
          </div>

          <Field name="Примечание:" value={data.note} />
        </Card>
      </Col>

      <Col span={24}>
        <Card title="Клиническое состояние">
          <div className="flex flex-wrap gap-x-[42px] gap-y-[7px] mb-[24px]">
            {fields.conditions?.filter(f => !!data[f.name]).map((field, i) => (
              <Point name={field.displayName} key={i} />
            ))}
          </div>

          <Field name="Примечание:" value={data.other_symptoms} />
        </Card>
      </Col>
    </Row>
  );
}

export const ComplaintsShow = memo(_ComplaintsShow);

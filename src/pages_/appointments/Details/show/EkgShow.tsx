import React, { FC, memo } from 'react';
import { IBooleanFields, IIntegerFields } from '@/entities/Appointment/model/IFormDataFields';
import { Empty } from '@/shared/ui/Empty';
import { Col, Row, Card } from 'antd';
import { Point } from '@/shared/ui/Point';
import { Field } from '@/pages_/appointments/Details/Field';
import { CrossIcon } from '@/shared/icons';

interface EkgShowProps {
  data: any;
  fields: {
    ekg: IBooleanFields[];
    echo_ekg: {
      float_fields: IIntegerFields[];
      boolean_fields: IBooleanFields[];
    };
  };
}

const _EkgShow: FC<EkgShowProps> = ({ data, fields, }) => {
  if (!data) {
    return <Empty />
  }

  return (
    <Row gutter={24}>
      <Col span={12}>
        <Card title="ЭКГ" className="h-full" extra={<p className="text-[16px] text-[#B4B4B4]">{data.date_ekg ?? '-'}</p>}>
          <div className="flex flex-wrap gap-x-[24px] gap-y-[7px] mb-[24px]">
            {fields?.ekg?.filter(f => !!data[f.name]).map((field, i) => (
              <Point name={field.displayName} key={i} />
            ))}
          </div>

          <Field name="Примечание:" value={data.another_changes} />
        </Card>
      </Col>

      <Col span={12}>
        <Card title="ЭХО-КГ" className="h-full" extra={<p className="text-[16px] text-[#B4B4B4]">{data.date_echo_ekg ?? '-'}</p>}>
          <Row gutter={[0, 5]}>
            {fields?.echo_ekg?.float_fields.map((field, i) => (
              <Col span={6} key={i}>
                {field.secondName ? (
                  <div>
                    <p className="text-[14px] text-[#B4B4B4]">
                      {field.displayName}
                    </p>
                    <div className="text-[16px] text-[#232323] mt-[-5px] flex gap-x-[8px] items-center">
                      {data[field.name] ?? '-'}
                      <CrossIcon className="mt-[3px]" />
                      {data[field.secondName] ?? '-'}
                    </div>
                  </div>
                ) : (
                  <Field name={field.displayName} value={data[field.name]} />
                )}
              </Col>
            ))}
          </Row>

          <div className="flex flex-wrap gap-x-[24px] gap-y-[7px] mb-[24px] mt-[12px]">
            {fields?.echo_ekg?.boolean_fields?.filter(f => !!data[f.name]).map((field, i) => (
              <Point name={field.displayName} key={i} />
            ))}
          </div>

          <Field name="Примечание:" value={data.note} />
        </Card>
      </Col>
    </Row>
  );
}

export const EkgShow = memo(_EkgShow);

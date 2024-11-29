import React, { FC, memo } from 'react';
import { Card, Form, Input } from 'antd';
import { DateInput } from '@/shared/ui/Form/DateInput';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';

interface SearchFormProps {
  onSubmit: (values: any) => void;
}

const _SearchForm: FC<SearchFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Card title="Выбор пациента" className="mb-[24px]">
      <Form onFinish={onSubmit} className="flex gap-x-[20px]" layout="vertical">
        <Form.Item
          className="grow basis-[20%] max-w-[20%]"
          label="Фамилия"
          name="last_name"
        >
          <Input placeholder="Фамилия" />
        </Form.Item>
        <Form.Item
          className="grow basis-[20%] max-w-[20%]"
          label="Имя"
          name="name"
        >
          <Input placeholder="Имя" />
        </Form.Item>
        <Form.Item
          className="grow basis-[20%] max-w-[20%]"
          label="Отчество"
          name="patronymic"
        >
          <Input placeholder="Отчество" />
        </Form.Item>

        <DateInput name="birth" label="Дата рождения" required={false} />

        <SubmitButton form={form} className="grow basis-[20%] max-w-[20%] self-end !m-0">
          Найти
        </SubmitButton>
      </Form>
    </Card>
  );
}

export const SearchForm = memo(_SearchForm);

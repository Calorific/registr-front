'use client';
import React, { useState } from 'react';
import { useSession } from '@/entities/Session/api';
import styles from './LoginForm.module.css';
import { Card, Form, Input, Space, Typography } from 'antd';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { ILoginForm } from '@/entities/Session/model/ILoginForm';

const LoginForm = () => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const session = useSession();
  const formSubmitHandler = async (values: ILoginForm) => {
    try {
      await session.login(values);
    } catch (e: any) {
      setErrorMessage(e.response.data.message);
    }
  };
  return (
      <Space className={styles.container}>
        <Card title={'Авторизация'} className={styles.form}>
          <Form
              form={form}
              layout={'vertical'}
              onFinish={formSubmitHandler}
          >
            <Typography.Text type={'danger'}>
              {errorMessage}
            </Typography.Text>
            <Form.Item
                label={'Логин:'}
                name={'login'}
                rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
                label={'Пароль:'}
                name={'password'}
                rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <SubmitButton form={form}>
                Войти
              </SubmitButton>
            </Form.Item>
          </Form>
        </Card>
      </Space>

  );
};

export default LoginForm;
import { ReactNode, useEffect, useState } from 'react';
import { Button, Form, FormInstance } from 'antd';
import styles from './Button.module.css';

interface props {
  form: FormInstance;
  children?: ReactNode;
  className?: string;
}

const SubmitButton = ({ form, children, className }: props) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(data => setSubmittable(data?.errorFields?.length === 0));
  }, [form, values]);

  return (
    <Button className={`${styles.button} w-[224px] h-[42px] ${className}`} type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

export default SubmitButton;
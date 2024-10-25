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
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button className={`${styles.button} !mt-[24px] w-[224px] h-[42px]`}  type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

export default SubmitButton;
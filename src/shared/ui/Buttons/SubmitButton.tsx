import { ReactNode, useEffect, useState } from 'react';
import { Button, Form, FormInstance } from 'antd';
import styles from './Button.module.css';

interface props {
  form: FormInstance,
  children?: ReactNode
}

const SubmitButton = ({ form, children }: props) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
      <Button className={styles.button} type={'primary'} htmlType={'submit'} disabled={!submittable}>
        {children}
      </Button>
  );
};

export default SubmitButton;
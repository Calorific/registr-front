import { FormInstance } from 'antd';
import { useCallback, useEffect, useState } from 'react';

export const useValidation = (form: FormInstance) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleValidation: any = useCallback(async () => {
    try {
      await form.validateFields();
    } catch (e: any) {
      console.log(e)
      setIsValid(!e.errorFields.length);
    }
  }, [form]);

  useEffect(() => {
    handleValidation().then();
  }, [handleValidation]);

  return [isValid, handleValidation];
}
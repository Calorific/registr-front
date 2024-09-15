import { FormInstance } from 'antd';
import { useCallback, useEffect, useState } from 'react';

export const useValidation = (form: FormInstance) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleValidation: any = useCallback(() => {
    setIsValid(!form.getFieldsError().some(e => e.errors.length));
  }, [form]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return [isValid, handleValidation];
}
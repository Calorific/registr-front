import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { notification } from 'antd';

export const useSuccessMessage = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('m') === 'success') {
      notification.destroy();
      notification.success({ type: 'success', message: 'Прием успешно сохранен' });
    }
  }, [searchParams]);
}
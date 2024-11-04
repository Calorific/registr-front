import React, { FC, memo } from 'react';
import { Button, FormInstance } from 'antd';
import styles from '@/shared/ui/Buttons/Button.module.css';
import Link from 'next/link';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';

interface NavigationButtonsProps {
  form: FormInstance;
  prevRoute?: string;
}

const _NavigationButtons: FC<NavigationButtonsProps> = ({ prevRoute, form }) => {

  return (
    <div className="mt-[24px] flex justify-between items-center">
      {prevRoute ? (
        <Link href={prevRoute}>
          <Button className={`${styles.button} w-[224px] h-[42px]`} type="default">
            Назад
          </Button>
        </Link>
      ) : <div></div>}

      <SubmitButton form={form}>
        Далее
      </SubmitButton>
    </div>
  );
}

export const NavigationButtons = memo(_NavigationButtons);

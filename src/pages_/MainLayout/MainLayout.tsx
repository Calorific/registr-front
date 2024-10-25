import React, { ReactNode } from 'react';
import SideBar from '@/widgets/SideBar/ui/SideBar';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-x-[42px] pl-[16px]">
      <SideBar />

      <main className="pr-[42px] grow-[1] pb-[16px]">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
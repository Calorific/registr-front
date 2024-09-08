import { ReactNode } from 'react';
import SideBar from '@/widgets/SideBar/ui/SideBar';
import styles from './MainLayout.module.css';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
      <>
        <SideBar />
        <main className={styles.main}>
          {children}
        </main>
      </>
  );
};

export default MainLayout;
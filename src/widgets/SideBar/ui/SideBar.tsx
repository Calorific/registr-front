import { LogoutButton } from './LogoutButton';
import { NavBar } from '@/widgets/SideBar/ui/NavBar';
import styles from './SideBar.module.css';
import { memo } from 'react';

const _SideBar = () => {

  return (
    <aside className="w-[320px] shrink-0 grow-0 my-[16px]">
      <div className={styles.sideBar + ' p-[42px] pb-[62px] pr-0 block w-[320px] shrink-0 grow-0 h-[922px] max-h-[97vh] top-[16px] !sticky'}>
        <NavBar />

        <nav>
          <ul>
            {/*<ProfileLink />*/}

            {/*<SettingsButton />*/}

            <LogoutButton />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export const SideBar = memo(_SideBar);
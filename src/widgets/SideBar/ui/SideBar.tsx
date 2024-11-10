import { ProfileLink } from '@/entities/Profile/ui/ProfileLink';
import { LogoutButton } from '@/entities/Session/ui/LogoutButton';
import { SettingsButton } from '@/features/Settings/ui/SettingsButton';
import { NavBar } from '@/widgets/SideBar/ui/NavBar';
import styles from './SideBar.module.css';

const SideBar = () => {

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

export default SideBar;
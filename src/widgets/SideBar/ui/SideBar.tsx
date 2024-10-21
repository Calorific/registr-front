import { ProfileLink } from '@/entities/Profile/ui/ProfileLink';
import { LogoutButton } from '@/entities/Session/ui/LogoutButton';
import { SettingsButton } from '@/features/Settings/ui/SettingsButton';
import { NavBar } from '@/widgets/SideBar/ui/NavBar';
import styles from './SideBar.module.css';

const SideBar = () => {

  return (
    <aside className={styles.sideBar + ' p-[42px] pb-[62px] pr-0 block w-[320px] shrink-0 grow-0'}>
      <NavBar />

      <nav>
        <ul>
          <ProfileLink />

          <SettingsButton />

          <LogoutButton />
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
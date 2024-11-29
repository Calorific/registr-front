import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/axiosProvider/axiosProvider';

export interface ILoginForm {
  login: string | null;
  password: string | null;
}

export const useSession = () => {
  const router = useRouter();
  return {
    login: async (loginForm: ILoginForm) => {
      return axiosInstance.post('auth/login', loginForm).then(({ data }) => {
        setCookie('authToken', data.token);
        localStorage.setItem('authToken', data.token);
        let lastPage = localStorage.getItem('lastPage');
        if (!lastPage) {
          localStorage.setItem('lastPage', '/patients');
          lastPage = '/patients';
        }
        router.push(lastPage);
      });
    },
    logout: () => {
      deleteCookie('authToken');
      localStorage.setItem('lastPage', window.location.pathname + window.location.search);
      localStorage.removeItem('authToken');
      router.push('/auth');
    },
  };
};
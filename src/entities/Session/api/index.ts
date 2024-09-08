import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { ILoginForm } from '@/entities/Session/model/ILoginForm';
import axiosInstance from '@/app/axiosProvider/axiosProvider';


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

export const getRole = () => {

};
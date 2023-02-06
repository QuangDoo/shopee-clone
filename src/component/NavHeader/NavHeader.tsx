import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { authApi } from 'src/apis';
import { path, purchasesStatus } from 'src/constants';
import { AppContext } from 'src/contexts/app.context';
import { locales } from 'src/i18n/i18n';
import { clearLocalStorage, getAvatarUrl } from 'src/utils';
import { Popover } from '../Popover';

const NavHeader = () => {
  const queryClient = useQueryClient();

  const { isAuthenticated, setIsAuthenticated, profile } = useContext(AppContext);

  const { t, i18n } = useTranslation();

  const currnentLanguage = locales[i18n.language as keyof typeof locales];

  const { mutate: logoutMutate } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearLocalStorage();
      setIsAuthenticated(false);
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] });
    }
  });

  const handleLogout = () => {
    logoutMutate();
  };

  const changeLanguage = (lang: 'vi' | 'en') => () => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className='flex justify-end'>
      <Popover
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col'>
              <button className='py-2 px-3 hover:text-primary10' onClick={changeLanguage('vi')}>
                Tiếng Việt
              </button>
              <button className='py-2 px-3 hover:text-primary10' onClick={changeLanguage('en')}>
                Tiếng Anh
              </button>
            </div>
          </div>
        }
        className='mr-6 flex cursor-pointer items-center py-1 hover:text-white/70'
      >
        {i18n.language === 'vi' ? <>🇻🇳</> : <>🇺🇸</>}

        <span className='mx-1'>{currnentLanguage}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          className='flex cursor-pointer py-1 hover:text-white/70'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <div className='flex flex-col items-start'>
                <Link to={path.user} className='py-2 px-3 hover:text-primary10'>
                  Tài khoản của tôi
                </Link>
                <Link to={path.purchaseHistory} className='py-2 px-3 hover:text-primary10'>
                  Đơn mua
                </Link>
                <button onClick={handleLogout} className='py-2 px-3 hover:text-primary10'>
                  Đăng xuất
                </button>
              </div>
            </div>
          }
        >
          <div className='flex cursor-pointer items-center py-1 hover:text-white/70'>
            <div className='mr-2 h-6 w-6 flex-shrink-0'>
              <img
                className='h-full w-full rounded-full object-cover'
                src={getAvatarUrl(profile?.avatar)}
                alt='avatar'
              />
            </div>
            <div>{profile?.email} </div>
          </div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70 '>
            Đăng ký
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40' />
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70 '>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavHeader;

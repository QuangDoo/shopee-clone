import classNames from 'classnames';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { path } from 'src/constants';
import { AppContext } from 'src/contexts/app.context';
import { getAvatarUrl } from 'src/utils';

const UserSideNav = () => {
  const { profile } = useContext(AppContext);

  return (
    <>
      <div className='flex items-center border-b border-b-gray-300 py-4'>
        <Link to={path.user} className='boder h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-black/10'>
          <img
            className='h-full w-full rounded-full object-cover'
            src={getAvatarUrl(profile?.avatar)}
            alt='avatar'
          ></img>
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 max-w-md truncate font-semibold text-gray-600 md:max-w-[120px]'>
            {profile?.name || profile?.email}
          </div>
          <Link to={path.user} className='flex items-center gap-2 text-xs capitalize text-gray-600'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
              />
            </svg>
            <div>Sửa Hồ Sơ</div>
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.home}
          className={({ isActive }) =>
            classNames(
              'my-6 flex flex-shrink-0 items-center text-xs font-semibold capitalize text-black hover:text-primary10/60',
              {
                'text-primary10': isActive,
                'text-gray-600': !isActive
              }
            )
          }
        >
          <img
            src='https://cf.shopee.vn/file/sg-11134004-23010-3e2eq8pktulv47'
            alt='new-friend'
            className='mr-1 h-5 w-5'
          />
          <div className='flex items-center'>
            <span>Ưu đãi dành riêng cho bạn</span>
            <span className='rounded-t-md rounded-r-md border bg-primary10 p-1 text-white'>New</span>
          </div>
        </NavLink>
        <NavLink
          to={path.home}
          className={({ isActive }) =>
            classNames(
              'my-6 flex flex-shrink-0 items-center text-xs font-semibold capitalize text-black hover:text-primary10/60',
              {
                'text-primary10': isActive,
                'text-gray-600': !isActive
              }
            )
          }
        >
          <img
            src='https://cf.shopee.vn/file/sg-11134004-23010-jp7ak5cdd4lvae'
            alt='new-friend'
            className='mr-1 h-5 w-5'
          />
          <div className='flex items-center'>
            <span>Sale 2.2</span>
            <span className='rounded-t-md rounded-r-md border bg-primary10 p-1 text-white'>New</span>
          </div>
        </NavLink>
        <NavLink
          to={path.user}
          className={({ isActive }) =>
            classNames(
              'my-6 flex flex-shrink-0 items-center text-xs font-semibold capitalize  hover:text-primary10/60',
              {
                'text-primary10': isActive,
                'text-gray-600': !isActive
              }
            )
          }
        >
          <img
            src='	https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4'
            alt='new-friend'
            className='mr-1 h-5 w-5'
          />

          <span>Tài khoản của tôi</span>
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames(
              'my-6 flex flex-shrink-0 items-center text-xs font-semibold capitalize  hover:text-primary10/60',
              {
                'text-primary10': isActive,
                'text-gray-600': !isActive
              }
            )
          }
        >
          <img
            src='	https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4'
            alt='new-friend'
            className='mr-1 h-5 w-5'
          />

          <span>Đổi mật khẩu</span>
        </NavLink>
        <NavLink
          to={path.purchaseHistory}
          className={({ isActive }) =>
            classNames(
              'my-6 flex flex-shrink-0 items-center text-xs font-semibold capitalize  hover:text-primary10/60',
              {
                'text-primary10': isActive,
                'text-gray-600': !isActive
              }
            )
          }
        >
          <img
            src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078'
            alt='new-friend'
            className='mr-1 h-5 w-5'
          />

          <span>Đơn mua</span>
        </NavLink>
      </div>
    </>
  );
};

export default UserSideNav;

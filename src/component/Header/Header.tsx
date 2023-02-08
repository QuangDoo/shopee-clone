import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { purchaseApi } from 'src/apis';
import { path, purchasesStatus } from 'src/constants';
import { AppContext } from 'src/contexts/app.context';
import useSearchProducts from 'src/hooks/useSearchProducts';
import { formatCurrency } from 'src/utils';
import { Input } from '../Input';
import { NavHeader } from '../NavHeader';
import { Popover } from '../Popover';

const MAX_PURCHASE = 5;

const Header = () => {
  const { isAuthenticated } = useContext(AppContext);

  const { onSubmit, register } = useSearchProducts();

  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  });

  const purchasesData = purchaseInCartData?.data?.data;

  return (
    <div
      className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5
pt-2 text-white'
    >
      <div className='container'>
        <NavHeader />
        <div className='mt-4 grid grid-cols-12 items-center gap-4'>
          <Link to={path.home} className='col-span-2 flex items-center font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='mr-2 h-11 w-11'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z'
              />
            </svg>
            <span className='opacity-0 md:opacity-100'>Xộp Pi</span>
          </Link>
          <form className='col-span-9 flex rounded-sm bg-white p-1' onSubmit={onSubmit}>
            <Input
              type='text'
              placeholder='NHẮC BẠN CHUẨN BỊ SĂN SALE 2.2'
              containerClassName='flex-grow py-2 border-none px-2 text-black outline-none'
              classNameError='hidden'
              inputClassName='outline-none w-full'
              register={register}
              name='name'
            />
            <button className='flex-shrink-0 rounded-sm bg-primary10 px-5 hover:opacity-90' type='submit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </button>
          </form>
          <Popover
            className='col-span-1 flex justify-center'
            disable={!isAuthenticated}
            renderPopover={
              <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                <div className='p-2'>
                  {purchasesData ? (
                    <>
                      <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                      {purchasesData.slice(0, 5).map((purchase) => (
                        <div className='mt-4 flex p-2 hover:bg-gray-100' key={purchase._id}>
                          <div className='flex-shrink-0'>
                            <img src={purchase.product.image} alt={purchase.product.image} className='h-11 w-11' />
                          </div>
                          <div className='ml-2 flex-grow overflow-hidden'>
                            <div className='truncate'>{purchase.product.name}</div>
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <span className='text-primary10'>{formatCurrency(purchase.product.price)}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div>Chưa có sản phẩm nào trong giỏ hàng</div>
                  )}

                  <div className='mt-6 flex items-center justify-between '>
                    <div className='text-sx capitalize text-gray-500'>
                      {purchasesData && purchasesData?.length > MAX_PURCHASE && purchasesData?.length - MAX_PURCHASE}{' '}
                      Thêm vào giỏ hàng
                    </div>
                    <Link to={path.cart} className='rounded bg-primary10 px-4 py-2 font-semibold capitalize text-white'>
                      Xem Giỏ Hàng
                    </Link>
                  </div>
                </div>
              </div>
            }
          >
            <Link to={path.cart} className='relative'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-8 w-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
              {isAuthenticated && (
                <div className='absolute top-0 right-[-10px] -translate-y-2 rounded-full bg-white px-[9px] py-[1px] text-xs text-primary10'>
                  {purchasesData?.length}
                </div>
              )}
            </Link>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;

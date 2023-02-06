import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { createSearchParams, Link } from 'react-router-dom';
import { purchaseApi } from 'src/apis';
import { Input } from 'src/component';
import { path, purchasesStatus } from 'src/constants';
import useQueryParams from 'src/hooks/useQueryParams';
import { formatCurrency, generateNameId } from 'src/utils';
import { Helmet } from 'react-helmet-async';

const purchaesStatusTabs = [
  { type: purchasesStatus.all, name: 'Tất cả' },
  { type: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { type: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { type: purchasesStatus.inProgress, name: 'Đang xử lý' },
  { type: purchasesStatus.delivery, name: 'Đang giao' },
  { type: purchasesStatus.cancelled, name: 'Đã hủy' }
];

const PurchaseHistory = () => {
  const queryParams: { type?: string } = useQueryParams();
  const queryStatusType = Number(queryParams.type) || purchasesStatus.all;

  const { data: purchasesData } = useQuery({
    queryKey: ['purchases', { status: queryStatusType }],
    queryFn: () => purchaseApi.getPurchases({ status: queryStatusType as PurchaseListStatus })
  });

  const purchases = purchasesData?.data.data || [];

  return (
    <div>
      <Helmet>
        <title>Đơn hàng | Shopee Clone</title>
        <meta name='description' content='Đơn hàng | Shopee Clone' />
      </Helmet>
      <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
        {purchaesStatusTabs.map((status) => {
          const isActive = queryStatusType === status.type;
          return (
            <Link
              key={status.type}
              to={{
                pathname: path.purchaseHistory,
                search: createSearchParams({ type: status.type + '' }).toString()
              }}
              className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
                'border-b-primary10 text-primary10': isActive,
                'border-b-black/10 text-gray-900': !isActive
              })}
            >
              {status.name}
            </Link>
          );
        })}
      </div>
      <form className='mt-4 flex rounded-sm bg-gray-300 p-1'>
        <button className='flex-shrink-0 rounded-sm  px-2 hover:opacity-90' type='submit'>
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
        <Input
          type='text'
          placeholder='Tìm kiếm đơn'
          containerClassName='w-full py-3 border-none px-2 text-black outline-none'
          classNameError='hidden'
          inputClassName='outline-none w-full bg-transparent'
          name='name'
        />
      </form>
      <div>
        {!!purchases.length &&
          purchases?.map((purchase) => (
            <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
              <Link
                to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                className='flex'
              >
                <div className='flex-shrink-0'>
                  <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
                </div>
                <div className='ml-3 flex-grow overflow-hidden'>
                  <div className='truncate'>{purchase.product.name}</div>
                  <div className='mt-3'>x{purchase.buy_count}</div>
                </div>
                <div className='ml-3 flex-shrink-0'>
                  <span className='truncate text-gray-500 line-through'>
                    {formatCurrency(purchase.product.price_before_discount)}
                  </span>
                  <span className='ml-2 truncate text-primary10'>{formatCurrency(purchase.product.price)}</span>
                </div>
              </Link>
              <div className='flex justify-end'>
                <div>
                  <span>Tổng giá tiền</span>
                  <span className='ml-4 text-xl text-primary10'>
                    {formatCurrency(purchase.product.price * purchase.buy_count)}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;

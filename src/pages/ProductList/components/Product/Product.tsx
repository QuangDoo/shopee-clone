import { Link } from 'react-router-dom';
import { path } from 'src/constants';

const Product = () => {
  return (
    <Link to={path.home}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src='https://cf.shopee.vn/file/1ca82d81ebe518cd5e2db5befac6d507_tn'
            alt=''
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='text-sx min-h-[2rem] line-clamp-2'>
            Áo polo nam MATANO có cổ trụ bẻ dệt sọc và họa tiết đẹp nổi bật, thể hiện cá tính, vải cá sấu cotton phom
            suông
          </div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-sm text-gray-500 line-through'>
              <span className='text-sx'>₫</span>
              <span className='text-sm'>5.000</span>
            </div>

            <div className='ml-1 truncate text-primary10'>
              <span className='text-sx'>₫</span>
              <span className='text-sm'>2.000</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-start'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x='0'
                    y='0'
                    className='h-3 w-3 fill-yellow-400 text-yellow-400'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                    ></polygon>
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x='0'
                  y='0'
                  className='h-3 w-3 fill-current text-gray-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                  ></polygon>
                </svg>
              </div>
            </div>
            <div className='ml-2 text-xs'>
              <span>5.66k</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;

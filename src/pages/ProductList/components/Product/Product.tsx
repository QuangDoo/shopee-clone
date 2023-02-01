import { Link } from 'react-router-dom';
import { ProductRating } from 'src/component/ProductRating';
import { path } from 'src/constants';
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils';

type Props = {
  product: Product;
};

const Product = (props: Props) => {
  const { _id, image, name, price_before_discount, price, rating, sold } = props.product;

  return (
    <Link to={`${path.home}${generateNameId({ name, id: _id })}`}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img src={image} alt={image} className='absolute top-0 left-0 h-full w-full bg-white object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>{name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-sm text-gray-500 line-through'>
              <span className='text-xs'>{formatCurrency(price_before_discount)}</span>
            </div>

            <div className='ml-1 truncate text-primary10'>
              <span className='text-sm'>{formatCurrency(price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-start'>
            <ProductRating rating={rating} />
            <div className='ml-2 text-xs'>
              <span>{formatNumberToSocialStyle(sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { productApi, purchaseApi } from 'src/apis';
import { Button, InputNumber, ProductRating, QuantityController } from 'src/component';
import { PurchasesStatus } from 'src/constants';
import { calculateDiscountPercent, formatCurrency, formatNumberToSocialStyle, getIdFromNameId } from 'src/utils';
import { Product } from '../ProductList';

const ProductDetail = () => {
  const { nameId } = useParams();

  const queryClient = useQueryClient();

  const id = getIdFromNameId(nameId + '');

  const { data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id + ''),
    enabled: Boolean(id)
  });

  const { data: productsByCategory } = useQuery({
    queryKey: ['productsByCategory', productData?.data.data?.category._id],
    queryFn: () => productApi.getProductList({ category: productData?.data.data?.category._id }),
    enabled: Boolean(productData),
    // set stale time = query products list
    staleTime: 3 * 60 * 1000
  });

  const { mutate } = useMutation(purchaseApi.addToCart, {
    onSuccess: () => {
      toast.success('Thêm vào giỏ hàng thành công');
      queryClient.invalidateQueries({ queryKey: ['purchases', { status: PurchasesStatus.inCart }] });
    }
  });

  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);
  const [activeImage, setActiveImage] = useState('');
  const [buyCount, setBuyCount] = useState<number>(1);

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (productData?.data.data && productData.data.data.images.length > 0) {
      setActiveImage(productData.data.data.images[0]);
    }
  }, [productData]);

  const {
    images = [],
    price = 0,
    rating = 0,
    category,
    description = '',
    image,
    price_before_discount = 0,
    name,
    quantity = 0,
    sold = 0
  } = productData?.data?.data || {};

  const currentImages = useMemo(() => {
    return images?.slice(...currentIndexImages);
  }, [images, currentIndexImages]);

  const chooseActive = (img: string) => () => {
    setActiveImage(img);
  };

  const handleNext = () => {
    if (currentIndexImages[1] > images?.length) {
      return;
    }

    setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
  };

  const handlePrevious = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // lấy chiều cao và chiều rộng của thẻ div
    const rect = e.currentTarget.getBoundingClientRect();
    const image = imageRef.current as HTMLImageElement;
    // lấy giá trị mặc định của image naturalHeight và naturalWidth
    const { naturalHeight, naturalWidth } = image;
    // offsetX là tọa độ con trỏ chuột chiều ngang
    // offetX là tọa độ con trỏ chuột chiều dọc
    // cách 1: Lấy offetX và offsetY đơn giản khi chúng ta đã xử lý đc bubble event
    // bubble event là khi hover hoặc js event con thì đồng nghĩ đang hover vào element cha
    // pointer-events-none để counter bubble event
    // const { offsetX, offsetY } = e.nativeEvent;
    // cách 2: lấy offsetX, offetY khi chúng ta không xử lý đc bubble event
    const offsetX = e.pageX - (rect.x + window.scrollX);
    const offsetY = e.pageX - (rect.y + window.scrollY);

    // công thức tính top và left
    const top = offsetX * (1 - naturalHeight / rect.height);
    const left = offsetY * (1 - naturalWidth / rect.width);

    image.style.width = naturalWidth + 'px';
    image.style.height = naturalHeight + 'px';
    // unset maxWidth mặc định để hình tràn ra bên ngoài
    image.style.maxWidth = 'unset';
    image.style.top = top + 'px';
    image.style.left = left + 'px';
  };

  const handleLeave = () => {
    imageRef.current?.removeAttribute('style');
  };

  const handleBuyCount = (value: number) => {
    setBuyCount(value);
  };

  const handleAddToCart = () => {
    mutate({ buy_count: buyCount, product_id: id });
  };

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full overflow-hidden pt-[100%] shadow hover:cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={handleLeave}
              >
                <img
                  src={activeImage}
                  alt={image}
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='w-10/2 absolute left-0 top-1/2 z-10 h-9 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handlePrevious}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages?.slice(0, 5)?.map((image, index) => {
                  const isActive = image === activeImage;
                  return (
                    <div
                      className='relative w-full pt-[100%] shadow transition-transform duration-200 hover:-translate-y-[0.06rem]'
                      key={image}
                      onMouseEnter={chooseActive(image)}
                    >
                      <img
                        src={image}
                        alt={name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />

                      {isActive && <div className='absolute inset-0 border border-primary10'></div>}
                    </div>
                  );
                })}
                <button
                  className='w-10/2 absolute right-0 top-1/2 z-10 h-9 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handleNext}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{name}</h1>
              <div className='mt-6 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-primary10 text-primary10'>{rating}</span>
                  <ProductRating
                    rating={rating}
                    activeClassName='fill-primary10 text-primary10 h-4 w-4'
                    inActiveClassName='fill-gray-300 text-text-gray-300 h-4 w-4'
                  />
                  <div className='mx-4 h-4 w-[1px] bg-gray-300' />
                  <div>
                    <span>{formatNumberToSocialStyle(sold)}</span>
                    <span className='ml-1 text-gray-500'>Đã bán</span>
                  </div>
                </div>
              </div>
              <div className='mt-6 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-sm text-gray-500 line-through'>₫{formatCurrency(price_before_discount)}</div>
                <div className='ml-2 text-xl font-medium text-primary10'>₫{formatCurrency(price)}</div>
                <div className='ml-2 rounded-sm bg-primary10 p-1 text-sm font-semibold uppercase text-white'>
                  {calculateDiscountPercent(price_before_discount, price)} giảm
                </div>
              </div>
              <div className=' mt-6 flex items-center'>
                <div className='text-md mr-2 capitalize text-gray-600'>Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onTyping={handleBuyCount}
                  max={quantity}
                  value={buyCount}
                />
                <div className='ml-2 text-sm font-medium capitalize text-gray-400'>{quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={handleAddToCart}
                  className='flex items-center rounded border border-red-500 bg-primary10/10 px-3 py-2 capitalize text-red-500'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='mr-2 h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  <div>Thêm vào giỏ hàng</div>
                </button>
                <button className='ml-2 rounded bg-red-500 px-3 py-3 capitalize text-white'>
                  <div>Mua ngay</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='row bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}></div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='row bg-gray-50 p-4 text-lg capitalize text-slate-700'>Sản phẩm cùng danh mục</div>
          <div className='relative mt-4 grid grid-cols-2 gap-4 md:grid-cols-3  lg:grid-cols-5'>
            {productsByCategory?.data.data?.products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

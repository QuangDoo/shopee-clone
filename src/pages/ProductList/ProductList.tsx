import { useQuery } from '@tanstack/react-query';
import { productApi } from 'src/apis';
import useQueryParams from 'src/hooks/useQueryParams';
import { AsideFilter, Product, SortProductList } from './components';

const ProductList = () => {
  const queryParams = useQueryParams();
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productApi.getProductList(queryParams)
  });

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data &&
                data?.data?.data?.products?.map((product) => {
                  return <Product key={product._id} product={product} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

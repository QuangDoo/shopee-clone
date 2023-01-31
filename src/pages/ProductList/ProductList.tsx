import { useQuery } from '@tanstack/react-query';
import { isUndefined, omitBy } from 'lodash';
import { categoryApi, productApi } from 'src/apis';
import { Pagination } from 'src/component';
import useQueryParams from 'src/hooks/useQueryParams';
import { AsideFilter, Product, SortProductList } from './components';

export type QueryConfig = {
  [key in keyof ProductListParams]: string;
};

const ProductList = () => {
  const queryParams: QueryConfig = useQueryParams();

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  );

  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProductList(queryConfig as ProductListParams)
  });

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategory()
  });

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            {!!categoryData?.data?.data?.length && (
              <AsideFilter queryConfig={queryConfig} categories={categoryData?.data?.data} />
            )}
          </div>
          {productData?.data?.data && (
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productData?.data?.data?.pagination?.page_size} />

              <>
                <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  {productData?.data?.data?.products?.map((product) => {
                    return <Product key={product._id} product={product} />;
                  })}
                </div>
                <Pagination queryConfig={queryConfig} pageSize={productData?.data?.data?.pagination?.page_size} />
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

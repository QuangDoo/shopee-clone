import { AsideFilter, Product, SortProductList } from './components';

const ProductList = () => {
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
              {[...Array(30)].map((_, index) => {
                return <Product key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

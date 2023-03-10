import { useMutation, useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { purchaseApi, PurchaseVars } from 'src/apis';
import { Button, QuantityController } from 'src/component';
import { path, purchasesStatus } from 'src/constants';
import { formatCurrency, generateNameId } from 'src/utils';

const Cart = () => {
  const [purchasesId, setPurchasesId] = useState<string[]>([]);
  const [productIds, setProductIds] = useState<string[]>([]);

  console.log('purchasesId', purchasesId);

  const { state } = useLocation();

  const { data: purchaseInCartData, refetch: refetchPurchasesInCart } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  });

  const { mutate: updatePurchasesIncartMudate } = useMutation({
    mutationFn: (payload: PurchaseVars) => purchaseApi.updatePurchasesInCart(payload),
    onSuccess: () => {
      refetchPurchasesInCart();
    }
  });

  const { mutate: deletePurchase } = useMutation({
    mutationFn: (purchasesId: string[]) => purchaseApi.deletePurchaseInCart(purchasesId),
    onSuccess: () => {
      refetchPurchasesInCart();
    }
  });

  const { mutate: buyProducts } = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      toast.success(data.data.message);
      refetchPurchasesInCart();
    }
  });

  useEffect(() => {
    if (state?.purchaseId && state?.productId) {
      setPurchasesId((prevState) => [...prevState, state.purchaseId]);
      setProductIds((prevState) => [...prevState, state.productId]);
    }
  }, [state?.purchaseId, state?.productId]);

  const purchaseInCart = purchaseInCartData?.data?.data || [];

  const purchasesSelected = purchaseInCart.filter((purchase) => purchasesId.includes(purchase.product._id));

  const totalPayment = purchasesSelected.reduce((total, purchase) => (total += purchase.buy_count * purchase.price), 0);

  const totalPriceBeforDiscount = purchasesSelected.reduce(
    (total, purchase) => (total += purchase.buy_count * purchase.price_before_discount),
    0
  );

  const handleSelectProduct = (purchase: Purchase) => () => {
    const index = purchasesId.findIndex((item) => item === purchase.product._id);

    if (index === -1) {
      setPurchasesId((prevState) => [...prevState, purchase.product._id]);
      setProductIds((prevState) => [...prevState, purchase._id]);
    } else {
      setPurchasesId((prevState) => prevState.filter((item) => item !== purchase.product._id));
      setProductIds((prevState) => prevState.filter((item) => item !== purchase._id));
    }
  };

  const handleSelectAll = () => {
    if (purchasesId.length === purchaseInCart.length) {
      setPurchasesId([]);
      setProductIds([]);
      return;
    }

    setPurchasesId(purchaseInCart?.map((purchase) => purchase.product._id));
    setProductIds(purchaseInCart?.map((purchase) => purchase._id));
  };

  const handleQuantity = (purchase: Purchase) => (value: number) => {
    updatePurchasesIncartMudate({ product_id: purchase.product._id, buy_count: value });
  };

  const handleTypeQuantity = (purchase: Purchase) =>
    debounce((value: number) => {
      updatePurchasesIncartMudate({ product_id: purchase.product._id, buy_count: value });
    }, 200);

  const handleDeleteCart = (purchasesId: string[]) => () => {
    if (!purchasesId.length) {
      return;
    }
    deletePurchase(purchasesId);
  };

  const handleBuyProduct = () => {
    if (!purchasesSelected.length) {
      return;
    }
    const body = purchasesSelected.map((purchase) => ({
      product_id: purchase.product._id,
      buy_count: purchase.buy_count
    }));

    buyProducts(body);
  };

  return (
    <div className=' bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 bg-white py-5 px-5 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex-grow text-black'>S???n ph???m</div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>????n gi??</div>
                  <div className='col-span-1'>S??? l?????ng</div>
                  <div className='col-span-1'>S??? ti???n</div>
                  <div className='col-span-1'>Thao t??c</div>
                </div>
              </div>
            </div>
            <div>
              {purchaseInCart?.map((purchase) => {
                const isSeleted = purchasesId.includes(purchase.product._id);

                return (
                  <div
                    key={purchase._id}
                    className='bg-whiter my-3 grid grid-cols-12 rounded-sm border border-gray-200 bg-white p-5 py-5 px-4 text-center text-gray-500 shadow'
                  >
                    <div className='col-span-6'>
                      <div className='flex items-center'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-primary10'
                            onChange={handleSelectProduct(purchase)}
                            checked={isSeleted}
                          />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            <Link
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                              className='h-20 w-20 flex-shrink-0'
                            >
                              <img src={purchase.product.image} alt={purchase.product.name} />
                            </Link>
                            <div className='flex-grow px-2 pt-1 pb-2'>
                              <Link
                                to={`${path.home}${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}
                                className='text-left line-clamp-2'
                              >
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6 flex items-center'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center gap-2'>
                            <div className='text-center text-xs text-gray-500 line-through'>
                              {formatCurrency(purchase.product.price_before_discount)}
                            </div>
                            <div className='text-sm text-black'>{formatCurrency(purchase.product.price)}</div>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                            <QuantityController
                              max={purchase.product.quantity}
                              value={purchase.buy_count}
                              onIncrease={handleQuantity(purchase)}
                              onDecrease={handleQuantity(purchase)}
                              onTyping={handleTypeQuantity(purchase)}
                            />
                          </div>
                        </div>
                        <div className='col-span-1 text-sm text-primary10'>
                          <div className='flex flex-shrink-0 items-center justify-center'>
                            {formatCurrency(purchase.product.price * purchase.buy_count)}
                          </div>
                        </div>
                        <Button
                          onClick={handleDeleteCart([purchase._id])}
                          className='col-span-1 text-sm text-gray-500 hover:text-primary10'
                        >
                          X??a
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {purchaseInCart.length ? (
          <div className='sticky bottom-0 z-10 grid grid-cols-12 items-center rounded-sm bg-white p-5 shadow'>
            <div className='col-span-12 md:col-span-6'>
              <div className='flex flex-shrink-0 items-center pr-3'>
                <input
                  type='checkbox'
                  className='h-5 w-5 accent-primary10'
                  onChange={handleSelectAll}
                  checked={purchasesId.length === purchaseInCart.length}
                  disabled={!purchaseInCart.length}
                />
                <div className='mx-3 border-none bg-none'>Ch???n t???t c???</div>
                <button
                  disabled={purchaseInCart.length === 0}
                  onClick={handleDeleteCart(productIds)}
                  className='mx-3 border-none bg-none hover:text-primary10'
                >
                  X??a
                </button>
              </div>
            </div>
            <div className='col-span-12 items-center justify-center lg:col-span-6 lg:ml-auto lg:flex'>
              <div>
                <div className='flex items-center justify-center text-sm lg:justify-end'>
                  <div>T???ng thanh to??n ({purchasesId.length} s???n ph???m)</div>
                  <div className='ml-2 text-sm text-primary10 lg:text-2xl'>{formatCurrency(totalPayment)}</div>
                </div>
                <div className='flex items-center justify-center text-sm lg:justify-end'>
                  <div className='text-gray-500'>Ti???t ki???m</div>
                  <div className='ml-6 text-primary10'>{formatCurrency(totalPriceBeforDiscount - totalPayment)}</div>
                </div>
              </div>
              <div className='flex items-center justify-center text-sm lg:justify-end'>
                <Button
                  onClick={handleBuyProduct}
                  className='rouned ml-2 flex h-10 w-52 items-center justify-center rounded-sm bg-red-500 text-sm uppercase text-white hover:bg-red-600'
                >
                  Mua h??ng
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to={path.home}
            className='flex flex-grow items-center justify-center rounded-sm bg-white p-5 text-center shadow hover:text-primary10'
          >
            Quay l???i trang s???n ph???m
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;

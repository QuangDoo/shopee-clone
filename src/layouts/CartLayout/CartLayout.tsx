import { ReactNode } from 'react';
import { CartHeader, Footer } from 'src/component';

const CartLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  );
};

export default CartLayout;

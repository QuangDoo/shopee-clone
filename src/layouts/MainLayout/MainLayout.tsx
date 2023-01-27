import { ReactNode } from 'react';
import { Footer, Header } from 'src/component';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;

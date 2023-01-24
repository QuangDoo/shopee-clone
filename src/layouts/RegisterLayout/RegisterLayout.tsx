import { Footer, RegisterHeader } from 'src/component';

type Props = {
  children: React.ReactNode;
};

const RegisterLayout = ({ children }: Props) => {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  );
};

export default RegisterLayout;

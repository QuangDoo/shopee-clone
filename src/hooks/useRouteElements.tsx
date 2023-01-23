import { useRoutes } from 'react-router-dom';
import { RegisterLayout } from 'src/layouts';
import { Login, ProductList, Register } from 'src/pages';

export const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    { path: '/', element: <ProductList /> }
  ]);

  return routeElements;
};

import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { Profile, Login, ProductList, Register, ProductDetail } from 'src/pages';
import { AppContext } from 'src/contexts/app.context';
import { MainLayout, RegisterLayout } from 'src/layouts';
import { path } from 'src/constants';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
};

// user was authenticated -> access login or register
// route will be navigated automatically to "/"
const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);

  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />;
};

export const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      //user want to access children
      //passed RejectedRoute (parent)
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      // user want to access children
      // passed RejectedRoute (parent)
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    }
  ]);

  return routeElements;
};

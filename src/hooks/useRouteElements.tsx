import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { Profile, Login, ProductList, Register } from 'src/pages';
import { AppContext } from 'src/contexts/app.context';
import { MainLayout, RegisterLayout } from 'src/layouts';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

// user was authenticated -> access login or register
// route will be navigated automatically to "/"
const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
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
          path: 'login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: 'register',
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
          path: 'profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ]);

  return routeElements;
};

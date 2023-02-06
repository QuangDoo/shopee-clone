import { lazy, useContext, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import // Login,
// ProductList,
// Register,
// ProductDetail,
// Cart,
// User,
// ChangePassword,
// PurchaseHistory,
// NotFound
'src/pages';
import { AppContext } from 'src/contexts/app.context';
import { MainLayout, RegisterLayout, CartLayout } from 'src/layouts';
import { path } from 'src/constants';
import { UserLayout } from 'src/pages/Profile/layouts';

const Login = lazy(() => import('src/pages/Login'));
const Register = lazy(() => import('src/pages').then(({ Register }) => ({ default: Register })));
const ProductDetail = lazy(() => import('src/pages/ProductDetail'));
const Cart = lazy(() => import('src/pages/Cart'));
const PurchaseHistory = lazy(() => import('src/pages/Profile/pages/PurchaseHistory'));
const ChangePassword = lazy(() => import('src/pages/Profile/pages/ChangePassword'));
const User = lazy(() => import('src/pages/Profile/pages/User'));
const ProductList = lazy(() => import('src/pages/ProductList'));
const NotFound = lazy(() => import('src/pages/NotFound'));

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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
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
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.purchaseHistory,
              element: (
                <Suspense>
                  <PurchaseHistory />
                </Suspense>
              )
            },
            {
              path: path.user,
              element: (
                <Suspense>
                  <User />
                </Suspense>
              )
            }
          ]
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        }
      ]
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.notFound,
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      )
    }
  ]);

  return routeElements;
};

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useContext, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'src/i18n/i18n';
import { ErrorBoundary } from './component';
import { AppContext, AppProvider } from './contexts/app.context';
import { useRouteElements } from './hooks';
import './index.css';
import { LocalStorageEventTartget } from './utils';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

function App() {
  const routeElements = useRouteElements();
  const { reset } = useContext(AppContext);

  useEffect(() => {
    LocalStorageEventTartget.addEventListener('clearLS', reset);
    // return sau khi component unmount de tranh ro ri bo nho
    return () => {
      LocalStorageEventTartget.removeEventListener('clearLS', reset);
    };
  }, [reset]);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AppProvider>
          <ErrorBoundary>
            {routeElements}
            <ToastContainer />
          </ErrorBoundary>
        </AppProvider>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

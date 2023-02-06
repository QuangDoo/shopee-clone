import { useContext, useEffect } from 'react';
import { AppContext } from './contexts/app.context';
import { useRouteElements } from './hooks';
import { LocalStorageEventTartget } from './utils';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
    <div>
      <Helmet>
        <title>Hello World</title>
        <link rel='canonical' href='https://www.tacobell.com/' />
      </Helmet>
      {routeElements}
    </div>
  );
}

export default App;

import { useContext, useEffect } from 'react';
import { AppContext } from './contexts/app.context';
import { useRouteElements } from './hooks';
import { LocalStorageEventTartget } from './utils';

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

  return <div>{routeElements}</div>;
}

export default App;

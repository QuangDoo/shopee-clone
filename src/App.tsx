import { useRouteElements } from './hooks';

function App() {
  const routeElements = useRouteElements();

  return <div>{routeElements}</div>;
}

export default App;

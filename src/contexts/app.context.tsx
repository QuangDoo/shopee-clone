import { createContext, useState } from 'react';
import { getAccessTokenFromLS } from 'src/utils';

type AppContext = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialAppContextValue: AppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
};

export const AppContext = createContext<AppContext>(initialAppContextValue);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContextValue.isAuthenticated);

  return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AppContext.Provider>;
};

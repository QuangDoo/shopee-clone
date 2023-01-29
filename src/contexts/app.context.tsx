import { createContext, useState } from 'react';
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils';

type AppContext = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | undefined;
  setProfile: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const initialAppContextValue: AppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
};

export const AppContext = createContext<AppContext>(initialAppContextValue);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContextValue.isAuthenticated);
  const [profile, setProfile] = useState<User | undefined>(initialAppContextValue.profile);

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  );
};

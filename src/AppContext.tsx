import * as React from 'react';
import { createContext, useState } from 'react';

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [_notification, _setNotification] = useState<any>({
    display: false,
    message: '',
    callback: null,
  });

  const promptNotification = (message: string, callback: unknown) => {
    _setNotification({ display: true, message, callback });
  };

  const dismissNotification = () => {
    _setNotification({ display: false, message: '', callback: null });
  };

  const value = {
    _notification,
    promptNotification,
    dismissNotification,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;

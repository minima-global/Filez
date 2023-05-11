import * as React from 'react';
import { createContext, useEffect, useState } from "react";
import { getStatus } from "./__minima__";

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [_notification, _setNotification] = useState<any>({
    display: false,
    message: '',
    callback: null,
  });
  const [root, setRoot] = useState('');
  const [pathname, setPathname] = useState<string | null>(null);
  const fullPath = root + (!!pathname ? `/${pathname}` : '');

  useEffect(() => {
    getStatus().then((response: any) => {
      setRoot(response.data);
    })
  }, []);

  useEffect(() => {
    try {
      const path = window.location.pathname.split('/')
          .filter(i => i !== '')
          .filter(i => i === '/');

      if (path[0]) {
        setPathname(path[0] as string);
      }
    } catch {
      setPathname(null);
    }
  }, []);

  const promptNotification = (message: string, callback: unknown) => {
    _setNotification({ display: true, message, callback });
  };

  const dismissNotification = () => {
    _setNotification({ display: false, message: '', callback: null });
  };

  const value = {
    root,
    pathname,
    fullPath,
    _notification,
    promptNotification,
    dismissNotification,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;

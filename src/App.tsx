import React, { useEffect, useState } from 'react';
import AppProvider from './AppContext';
import Home from './pages/Home';
import Splash from './components/Splash';
import Titlebar from "./components/Titlebar";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (window as any).MDS.init(() => {
      setLoaded(true);
    }, []);
  });

  if (!loaded) {
    return <div />;
  }

  return (
    <AppProvider>
      <Splash />
      <div className="flex flex-col min-h-screen">
        <Titlebar />
        <div className="mobile-container restriction grow">
          <Home />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;

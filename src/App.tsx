import React, { useEffect, useState } from 'react';
import AppProvider from './AppContext';
import Home from './pages/Home';
import Splash from './components/Splash';

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
      <div className="mobile-container restriction">
        <Splash />
        <Home />
      </div>
    </AppProvider>
  );
}

export default App;

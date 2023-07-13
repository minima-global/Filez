import { useEffect, useState } from 'react';
import AppProvider from './AppContext';
import Home from './pages/Home';
import Splash from './components/Splash';
import Titlebar from './components/TitleBar';
import { clearDownload, deleteFromWeb, getDownloads } from "./__minima__";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);

      (window as any).MDS.init((msg: any) => {
        if (msg.event === 'inited') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          MDS.sql('CREATE TABLE IF NOT EXISTS downloaded (id bigint auto_increment,file_path varchar(2048) NOT NULL)', function() {
            getDownloads().then(async (downloads: any) => {
              for (const file of downloads) {
                await deleteFromWeb(file.FILE_PATH);
                await clearDownload(file.FILE_PATH)
              }
            })
          });
        }
      });
    }
  }, [loaded]);

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

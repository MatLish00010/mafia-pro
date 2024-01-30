import {Outlet} from 'react-router-dom';

import {ThemeProvider} from '@/providers/theme.tsx';
import Header from '@/ui/header.tsx';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

const WrapperApp = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  );
};

export default WrapperApp;

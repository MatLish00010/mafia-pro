import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Outlet} from 'react-router-dom';

import {ThemeProvider} from '@/providers/theme.tsx';
import Header from '@/ui/header.tsx';
import {Toaster} from '@/ui/toast/toaster.tsx';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <>
      <div>
        <Header />
        <main className="container mx-auto">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </>
  );
}

const WrapperApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default WrapperApp;

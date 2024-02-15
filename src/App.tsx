import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Outlet} from 'react-router-dom';

import {SessionContext} from '@/context/SessionContext.ts';
import useSession from '@/hooks/auth/useSession.ts';
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
      <Header />
      <main className="container mx-auto flex-1 flex flex-col">
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}

const WrapperApp = () => {
  const {session} = useSession();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SessionContext.Provider value={session}>
          <App />
        </SessionContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default WrapperApp;

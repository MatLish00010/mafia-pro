import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import App from '@/App.tsx';
import ErrorPage from '@/error-page.tsx';
import {getSession} from '@/requests/session';
import Index from '@/routes';
import SignIn from '@/routes/Auth/SignIn';
import SignUp from '@/routes/Auth/SignUp';
import Games from '@/routes/Games';
import Rating from '@/routes/Rating';
import RequiredRouter from '@/routes/RequiredRouter';
import Users from '@/routes/Users';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {index: true, element: <Index />},
          {
            path: '/signIn',
            element: <SignIn />,
          },
          {
            path: '/signUp',
            element: <SignUp />,
          },
          {
            path: 'rating',
            element: <Rating />,
          },
          {
            element: <RequiredRouter />,
            loader: getSession,
            children: [
              {
                path: 'games',
                element: <Games />,
              },
              {
                path: 'players',
                element: <Users />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

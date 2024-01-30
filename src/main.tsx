import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import App from '@/App.tsx';
import ErrorPage from '@/error-page.tsx';
import Index from '@/routes';
import Games from '@/routes/Games';
import Rating from '@/routes/Rating';

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
            path: 'games',
            element: <Games />,
          },
          {
            path: 'rating',
            element: <Rating />,
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

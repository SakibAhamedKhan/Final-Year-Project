import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

ReactDOM.render(
  
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
  <App />
  </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

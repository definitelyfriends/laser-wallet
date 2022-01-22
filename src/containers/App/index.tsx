import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import Home from 'containers/Home';
import { initializePayment } from 'lib/payment';

const queryClient = new QueryClient();

// @ts-ignore
window.initializePayment = initializePayment;

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Home />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;

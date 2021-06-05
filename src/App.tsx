import React, { useEffect } from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query';
import AnimatedRoutes from './components/shared/AnimatedRoutes';
function App() {
  useEffect(() => {
    window.setInterval(() => {
      document.title = document.title === "Jonathan Wright - Techytechster" ? "⚡⚡ MONSTER SPONSOR ME PLEASE ⚡⚡" : "Jonathan Wright - Techytechster"
    }, 3000);
  }, []);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <AnimatedRoutes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;

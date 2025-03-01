import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
    <GoogleOAuthProvider clientId="341747729857-58ude997bbl56ipi3jr0ls1m6msrbdqm.apps.googleusercontent.com">

      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      </GoogleOAuthProvider>;
    </MantineProvider>
  </StrictMode>,
)

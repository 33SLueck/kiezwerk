'use client';

import * as React from 'react';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from './cart-provider';
import { ThemeProvider } from './theme-provider';

export const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}
const Providers = ({ children }: Props) => {
  useEffect(() => {
    const metaTag = document.createElement('meta');
    metaTag.httpEquiv = 'Content-Security-Policy';
    metaTag.content = 'upgrade-insecure-requests';
  
    if (location.protocol === 'https:') {
      document.head.appendChild(metaTag);
    }
  
  }, []);
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;

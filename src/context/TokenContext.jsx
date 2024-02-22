// TokenContext.js
import React, { createContext, useState } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

  return (
    <TokenContext.Provider value={{ accessToken, setAccessToken, csrfToken, setCsrfToken }}>
      {children}
    </TokenContext.Provider>
  );
};

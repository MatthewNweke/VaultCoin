import React, { createContext, useContext, useState } from 'react';

const PaymentMethodContext = createContext();

export const PaymentMethodProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <PaymentMethodContext.Provider value={{ paymentMethod, setPaymentMethod }}>
      {children}
    </PaymentMethodContext.Provider>
  );
};

export const usePaymentMethod = () => useContext(PaymentMethodContext);

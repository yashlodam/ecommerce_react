import React, { createContext, useContext } from "react";
import { toast } from "./toastStore";
import ToastContainer from "./ToastContainer";

const ToastContext = createContext(toast);

export function ToastProvider({ children }) {
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  return context || toast;
}

export default ToastContext;

// src/components/Toast/ToastProvider.tsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastProvider() {
  return <ToastContainer 
  position="bottom-right"
      autoClose={3500}
      closeOnClick
      pauseOnHover
      draggable
      newestOnTop/>;
}

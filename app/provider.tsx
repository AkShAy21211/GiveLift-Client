"use client";
import store, { persistor } from "@/store/store";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="top-center" />
        {children}
      </PersistGate>
    </Provider>
  );
}

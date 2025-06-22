"use client";
import Footer from "@/components/layout/regular-user/Footer";
import Header from "@/components/layout/regular-user/Header";
import store, { persistor } from "@/store/store";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Header />
      <Toaster position="top-center" />
        {children}
        <Footer />
      </PersistGate>
    </Provider>
  );
}

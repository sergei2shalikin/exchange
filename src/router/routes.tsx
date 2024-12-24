import React from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router";
import { RatesPage } from "../pages/rates.page";
import { AuthPage } from "../pages/auth.page";
import { AuthLayout } from "../layout/auth.layout";
import MainLayout from "../layout/main.layout";
import AuthProvider from "../auth/auth.provider";
import ExchangePage from "../pages/exchange.page";
import NotFoundPage from "../pages/notFound.page";

export const handleProtected = async () => {
  const token = localStorage.getItem("demo");
  if (token) throw redirect("/signin");
  return null;
};

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/"
              loader={async () => await handleProtected()}
              element={<RatesPage />}
            />
            <Route path="exchange"
              loader={async () => await handleProtected()}
              element={<ExchangePage />}
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="signin" element={<AuthPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter >
  );
}
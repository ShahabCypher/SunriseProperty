import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  initializeAuth,
  selectAuthInitialized,
  selectAuthLoading,
} from "store/slices/authSlice";
import Layout from "layouts/Layout";
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";

const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectAuthInitialized);
  const isLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, isInitialized]);

  // Show loading spinner while initializing auth
  if (!isInitialized && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 border-2 border-main-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-medium-gray">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="auth/:type" element={<AuthPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

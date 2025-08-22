import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  initializeAuth,
  selectAuthInitialized,
  selectAuthLoading,
} from "store/slices/authSlice";
import Layout from "layouts/Layout";
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import Loader from "components/modules/Loader";

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
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="auth/:type" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

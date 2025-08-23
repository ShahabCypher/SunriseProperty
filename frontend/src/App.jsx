import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  initializeAuth,
  selectAuthInitialized,
  selectAuthLoading,
} from "store/slices/authSlice";
import Layout from "layouts/Layout";
import HomePage from "pages/HomePage";
import PropertiesPage from "pages/PropertiesPage";
import LocationsPage from "pages/LocationsPage";
import ContactPage from "pages/ContactPage";
import AuthPage from "pages/AuthPage";
import AdminPanel from "pages/AdminPanel";
import Loader from "components/modules/Loader";
import PropertyService from "services/propertyService";

const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectAuthInitialized);
  const isLoading = useAppSelector(selectAuthLoading);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, isInitialized]);

  const hpfilters = {
    sortBy: "price.amount",
    sortOrder: "desc",
    page: 1,
    limit: 3,
  };

  const loadProperties = async () => {
    setLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(hpfilters).filter(([key, value]) => value !== "")
      );

      const response = await PropertyService.getAllProperties(cleanFilters);
      setProperties(response.data.properties);
    } catch (error) {
      console.error("Failed to load properties:", error);
    } finally {
      setLoading(false);
    }
  };

  if ((!isInitialized && isLoading) || loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin/*" element={<AdminPanel />} />

        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route index element={<HomePage properties={properties} />} />
                <Route path="properties" element={<PropertiesPage />} />
                <Route path="locations" element={<LocationsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="auth/:type" element={<AuthPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

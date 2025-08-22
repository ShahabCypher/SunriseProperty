import { Routes, Route } from "react-router-dom";

import Layout from "layouts/Layout";
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="auth/:type" element={<AuthPage />} />
      </Routes>
    </Layout>
  );
};

export default App;

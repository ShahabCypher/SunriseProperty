import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </Layout>
  );
};

export default App;

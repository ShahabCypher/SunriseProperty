import { Navigate, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "store/hooks";
import { selectUser } from "store/slices/authSlice";
import AdminSidebar from "components/admin/AdminSidebar";
import AdminHeader from "components/admin/AdminHeader";
import AdminDashboard from "pages/admin/AdminDashboard";
import AdminProperties from "pages/admin/AdminProperties";
import AdminPropertyCreate from "pages/admin/AdminPropertyCreate";
import AdminPropertyView from "pages/admin/AdminPropertyView";
import AdminPropertyEdit from "pages/admin/AdminPropertyEdit";

const AdminPanel = () => {
  const user = useAppSelector(selectUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (user.role !== "admin" && user.role !== "agent") {
    return <Navigate to="/" replace />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-light-section-background">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <AdminHeader onToggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="properties/create" element={<AdminPropertyCreate />} />
            <Route path="properties/:id/view" element={<AdminPropertyView />} />
            <Route path="properties/:id/edit" element={<AdminPropertyEdit />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminUnsavedChangesProvider } from "@/components/admin/AdminUnsavedChangesProvider";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminUnsavedChangesProvider>
      <div className="admin-shell">
        <AdminSidebar />
        <div className="admin-workspace">{children}</div>
      </div>
    </AdminUnsavedChangesProvider>
  );
}

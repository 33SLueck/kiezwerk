import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { AdminLayoutWrapper } from '../components/AdminLayoutWrapper';

const isAuthRequired = () => process.env.REQUIRE_ADMIN_AUTH === 'true';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  const isAdmin = user?.role === 'ADMIN';

  if (isAuthRequired() && (!user || !isAdmin)) {
    redirect('/admin/login');
  }

  return (
    <AdminLayoutWrapper
      user={{
        name: user?.name || 'Demo Admin',
        email: user?.email || 'demo.admin@kiezwerk.example',
      }}
    >
      {children}
    </AdminLayoutWrapper>
  );
};

export default DashboardLayout;

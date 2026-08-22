import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | KiezWerk Berlin',
  description: 'Adminbereich – Anmeldung erforderlich.',
  robots: { index: false, follow: false },
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen bg-background text-foreground">{children}</div>;
};

export default AdminLayout;

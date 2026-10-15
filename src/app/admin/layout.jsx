export const metadata = {
  title: 'SolarCleaner.in Admin Portal & CMS',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ colorScheme: 'light', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }} data-theme="light">
      {children}
    </div>
  );
}

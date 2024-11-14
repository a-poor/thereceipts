import { ReplicacheProvider } from '@/components/ReplicacheContext';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReplicacheProvider>
      {children}
    </ReplicacheProvider>
  );
}

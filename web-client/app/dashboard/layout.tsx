import Sidebar from "./components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex mx-auto w-full h-full overflow-auto">
      <Sidebar />
      <main className="w-full px-8">{children}</main>
    </div>
  );
}

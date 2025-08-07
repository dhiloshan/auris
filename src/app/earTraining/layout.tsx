export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex-1">
      <main>
        {children}
      </main>
    </div>
  );
}

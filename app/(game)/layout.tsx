import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="font-roboto bg-[url('/assets/landingPage/sikkaplaybg.svg')] bg-cover bg-no-repeat ">
        {children}
      </body>
    </html>
  );
}

import Providers from "./providers"; // <-- import it
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-black to-blue-900 flex items-center justify-center" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

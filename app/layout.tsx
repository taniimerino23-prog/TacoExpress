import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "TacoExpress",
  description: "Sistema de gestión de pedidos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100 min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-red-600">
          TacoExpress
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-red-600">
            Inicio
          </Link>

          <Link href="/menu" className="hover:text-red-600">
            Menú
          </Link>

          <Link href="/login" className="hover:text-red-600">
            Iniciar sesión
          </Link>
        </div>
      </nav>
    </header>
  );
}
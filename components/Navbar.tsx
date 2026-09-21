import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md mb-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <span className="font-bold text-xl text-orange-500">🌮 TacoExpress</span>
        
        <div className="flex gap-6 font-medium text-sm">
          <Link 
            href="/pedidos" 
            className="hover:text-orange-400 transition-colors"
          >
            📋 Gestión de Pedidos
          </Link>
        </div>
      </div>
    </nav>
  );
}

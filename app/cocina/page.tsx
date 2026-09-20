"use client";
import { useAuth } from "../../context/AuthContext";

export default function CocinaPage() {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>Debes iniciar sesión</p>;
  if (role !== "cocina") return <p>No tienes acceso a esta página</p>;

  return <h1>Panel de Cocina</h1>;
}

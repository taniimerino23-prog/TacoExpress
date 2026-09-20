"use client";

import { useState } from "react";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuario creado con éxito 🚀");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/logo-taqueria.png')" }}
    >
      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

      {/* Formulario */}
      <div className="relative bg-black bg-opacity-70 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Crear cuenta en TacoExpress
        </h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Registrarse
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login exitoso");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/logo-taqueria.png')",
      }}
    >
        {/* Overlay con blur */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/40"></div>

      <div className=" relative bg-black bg-opacity-70 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Bienvenido a TacoExpress!
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
          onClick={handleLogin}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Iniciar sesión
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
}

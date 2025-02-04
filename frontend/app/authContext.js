"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Проверка авторизации при монтировании
  useEffect(() => {
    // Пример: проверяем localStorage или сессию
    const user = localStorage.getItem("user"); // Здесь предполагаем, что информация о пользователе сохраняется в localStorage
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify({ email: "test_user@example.com" })); // Сохраняем пользователя
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user"); // Удаляем пользователя
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

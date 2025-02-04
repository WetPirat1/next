import { useAuth } from "@/context/authContext"; // Импортируем контекст
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProtectedPage({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setShowMessage(true);
      setTimeout(() => {
        router.push("/login"); // Перенаправляем на страницу логина через 3 секунды
      }, 3000); // Задержка 3 секунды
    }
  }, [isAuthenticated, loading, router]);

  if (loading) return null; // Ждем, пока не загрузится состояние авторизации

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
          {showMessage && <p className="text-red-500">You are not logged in. Redirecting to login page...</p>}
        </div>
      </div>
    );
  }

  return children; // Если авторизован, показываем контент
}

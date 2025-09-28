"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 gap-12 px-4">
      {/* Title */}
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-blue-700 text-center drop-shadow-lg">
        SaaS Notes
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-700 text-center max-w-md">
        Manage your notes efficiently across multiple tenants with role-based access and subscription plans.
      </p>

      {/* Login Button */}
      <button
        onClick={goToLogin}
        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
      >
        Go to Login
      </button>
    </div>
  );
}

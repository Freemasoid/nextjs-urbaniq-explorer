"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/chat");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to UrbanIQ Explorer</h1>
        <p className="text-xl text-gray-600">Redirecting you to chat...</p>
      </div>
    </div>
  );
};

export default Index;

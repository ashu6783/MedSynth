"use client";

import Header from "../Header";
import Sidebar from "../Sidebar";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = [
    "/auth-page/signin",
    "/auth-page/signup",
    "/verify-email",
    "/reset-password",
    "/forgot-password",
  ];

  useEffect(() => {
    if (status === "unauthenticated" && !publicRoutes.includes(pathname)) {
      router.push("/auth-page/signin");
    }
  }, [status, pathname, router]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col lg:ml-[290px]">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 dark:bg-[#121212] md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

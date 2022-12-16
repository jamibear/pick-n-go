"use client";
import "app/globals.css";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function DashboardLayout({ children }) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="max-w-6xl mx-auto my-3">
      <header className="flex m-6">
        <Link className="font-bold mx-3" href="/users">
          {segment === "users" ? (
            <span className="text-3xl">Users</span>
          ) : (
            <span>Users</span>
          )}
        </Link>
        <Link className="font-bold mx-3" href="/products">
          {segment === "products" ? (
            <span className="text-3xl">Products</span>
          ) : (
            <span>Products</span>
          )}
        </Link>
        <Link className="font-bold mx-3" href="/sales">
          {segment === "sales" ? (
            <span className="text-3xl">Sales</span>
          ) : (
            <span>Sales</span>
          )}
        </Link>
      </header>
      {children}
    </div>
  );
}

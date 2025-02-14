
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

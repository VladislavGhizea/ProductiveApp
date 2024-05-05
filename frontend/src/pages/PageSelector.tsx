"use client";
import state from "@/store";
import { useSnapshot } from "valtio";
import Home from "@/pages/home";
import Login from "@/pages/login.page";

export const PageSelector = () => {
  const snap = useSnapshot(state);
  if (snap.page === "home") {
    return <Home />;
  } else if (snap.page === "login") {
    return <Login />;
  } else return <div>debug @/pages/pageSelector.tsx</div>;
};

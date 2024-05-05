"use client";
import Image from "next/image";
import state from "@/store";
import { useSnapshot } from "valtio";
import LoginComponent from "@/components/Login.component";
export default function Login() {
  const snap = useSnapshot(state);
  return (
    <>
      <main className="h-screen">
        <div className="grid grid-flow-col h-svh">
          <div>
            <button
              onClick={() => {
                state.page = "home";
              }}
            >
              <Image
                src="/back.png"
                alt="back button"
                width={48}
                height={48}
                className=" m-4"
              />
            </button>
            <div className="flex flex-row items-center justify-center">
              <Image
                src="/iconProductive.png"
                alt="app icon"
                width={86}
                height={86}
              />
              <h1 className="text-4xl">Productive</h1>
            </div>
          </div>
          <LoginComponent className=" bg-slate-200" />
        </div>
      </main>
    </>
  );
}

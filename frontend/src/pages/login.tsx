"use client";
import styled from "styled-components";
import Image from "next/image";
import state from "@/store";
import { useSnapshot } from "valtio";
//todo IMPLEMENTARE LA VALIDAZIONE DEI CAMPI
export default function Login() {
  const snap = useSnapshot(state);
  return (
    <>
      <main>
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
        <div className=" border-4 border-gray-400">
          <div className=" flex flex-row items-center justify-center">
            <Image
              src="/iconProductive.png"
              alt="app icon"
              width={86}
              height={86}
            />
            <h1 className=" text-4xl">Productive</h1>
          </div>

          <div className=" flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="Username"
              className=" m-2 p-2 border-2 border-gray-400 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className=" m-2 p-2 border-2 border-gray-400 rounded"
            />
            <div className=" flex flex-row">
              <button className=" m-2 p-2 bg-custom-blue text-white rounded">
                Log in
              </button>
              <button className=" m-2 p-2 bg-custom-blue text-white rounded">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

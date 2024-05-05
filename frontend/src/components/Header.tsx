"use client";
import Image from "next/image";
import styled from "styled-components";
import state from "@/store";
import { useSnapshot } from "valtio";

const StyledHeader = styled.header`
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.6);
`;
const Header = () => {
  const snap = useSnapshot(state);
  return (
    <StyledHeader className=" sticky z-10 top-0">
      <ul className=" flex flex-row justify-between justify-items-center items-center">
        <li>
          <ul className="flex flex-row justify-items-center items-center">
            <li>
              <Image
                alt="app icon"
                src={"/iconProductive.png"}
                width={64}
                height={64}
              />
            </li>
            <li className="">
              <h3>Productive</h3>
            </li>
          </ul>
        </li>
        <li className=" mr-4">
          <button
            onClick={() => {
              state.page = "login";
            }}
          >
            <div className=" flex bg-custom-blue text-black rounded w-[76px] h-8 content-center justify-center hover:bg-custom-light-blue items-center ">
              <h3 className="">Log in</h3>
            </div>
          </button>
        </li>
      </ul>
    </StyledHeader>
  );
};

export default Header;

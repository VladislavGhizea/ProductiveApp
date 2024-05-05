"use client";
import Image from "next/image";
import Header from "@/components/Header";
import styled from "styled-components";

const BgDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: calc(100% -100px);
`;

const StyledImage = styled.img`
  position: relative;
  width: 100%;
  margin-top: -100px;
`;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <BgDiv>
          <StyledImage src="/blobBg.svg" alt="Background" />
          <div className=" absolute top-[calc(100vh/3)] flex items-center justify-center flex-col">
            <h2 className="text-4xl">A set of productive applications at</h2>
            <h2 className="text-4xl">your service!</h2>
          </div>
        </BgDiv>
        <div>
          <div className=" grid grid-cols-[max-content,min-content] grid-rows-2">
            <div></div>
            <div className=" translate-x-10 translate-y-6">
              <Image src="/scribble.svg" alt="aa" width={200} height={200} />
            </div>
            <h2 className="text-4xl ml-4">Need to organize your</h2>
            <h2 className="text-4xl ml-4">work?</h2>
          </div>
        </div>
      </main>
    </>
  );
}

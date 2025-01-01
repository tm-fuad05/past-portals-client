import React from "react";
import Banner from "../Components/Home Comp/Banner";
import FAQ from "../Components/Home Comp/FAQ";
import ArtifactsVerify from "../Components/Home Comp/ArtifactsVerify";
import MuseumInfo from "../Components/Home Comp/MuseumInfo";
import HighestLike from "../Components/Home Comp/HighestLike";

const Home = () => {
  return (
    <div>
      <div>
        <div className="relative mb-[880px] md:mb-[650px] lg:mb-[400px]">
          <Banner></Banner>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 w-11/12 md:w-10/12 lg:w-9/12 top-[570px] md:top-[600px] lg:top-[460px] z-10">
          <MuseumInfo></MuseumInfo>
        </div>
      </div>
      <HighestLike></HighestLike>
      <ArtifactsVerify></ArtifactsVerify>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;

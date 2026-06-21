import React from "react";
import Banner from "../Components/Home Comp/Banner";
import FAQ from "../Components/Home Comp/FAQ";
import ArtifactsVerify from "../Components/Home Comp/ArtifactsVerify";
import MuseumInfo from "../Components/Home Comp/MuseumInfo";
import HighestLike from "../Components/Home Comp/HighestLike";
import Newsletter from "../Components/Home Comp/Newsletter";

const Home = () => {
  return (
    <div className="space-y-32">
      <div className="space-y-16">
        <Banner></Banner>
        <MuseumInfo></MuseumInfo>
      </div>
      <HighestLike></HighestLike>

      <ArtifactsVerify></ArtifactsVerify>
      <FAQ></FAQ>

      <Newsletter />
    </div>
  );
};

export default Home;

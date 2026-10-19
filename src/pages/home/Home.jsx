import Banner from "./components/Banner";
import FAQ from "./components/FAQ";
import ArtifactsVerify from "./components/ArtifactsVerify";
import MuseumInfo from "./components/MuseumInfo";
import HighestLike from "./components/HighestLike";
import Newsletter from "./components/Newsletter";

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

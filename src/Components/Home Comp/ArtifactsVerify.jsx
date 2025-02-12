import { div } from "motion/react-client";
import React from "react";
import { FaMicroscope, FaDna, FaFlask, FaNetworkWired } from "react-icons/fa";

const ArtifactsVerify = () => {
  return (
    <div className="bg-gray-100 bg-opacity-60">
      <div className="min-h-screen flex lg:flex-row flex-col items-center justify-center w-11/12 mx-auto lg:gap-10">
        <div className="text-center mb-8 space-y-2  pt-10">
          <button className="border border-black rounded-full px-2 py-[3px] text-[10px]">
            The Solution
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">
            Artifacts <span className="text-darkRed">VERIFY</span>
          </h1>
          <p className="text-gray-600">
            A powerful combination of chemical analysis and artificial
            intelligence
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Card 1 */}
            <div className="card bg-red-100  rounded-2xl p-6 text-center">
              <FaMicroscope className="text-4xl text-[#323232] mx-auto mb-4" />
              <h2 className="font-light text-gray-600 text-[15px]">
                Fast, effective testing of medicines
              </h2>
            </div>

            {/* Card 2 */}
            <div className="card bg-red-100  rounded-2xl p-6 text-center">
              <FaDna className="text-4xl text-[#323232] mx-auto mb-4" />
              <h2 className="font-light text-gray-600 text-[15px]">
                Artificial Intelligence interprets and delivers initial findings
                immediately
              </h2>
            </div>

            {/* Card 3 */}
            <div className="card bg-red-100  rounded-2xl p-6 text-center">
              <FaFlask className="text-4xl text-[#323232] mx-auto mb-4" />
              <h2 className="font-light text-gray-600 text-[15px]">
                Scientifically validated results recorded on blockchain guide
                risk mitigation actions
              </h2>
            </div>

            {/* Card 4 */}
            <div className="card bg-red-100  rounded-2xl p-6 text-center">
              <FaNetworkWired className="text-4xl text-[#323232] mx-auto mb-4" />
              <h2 className="font-light text-gray-600 text-[15px]">
                Deployed at any point in the supply chain
              </h2>
            </div>
          </div>
          <button className="btn bg-red-500 text-white my-8 block mx-auto">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtifactsVerify;

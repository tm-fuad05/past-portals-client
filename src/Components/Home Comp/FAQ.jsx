import { div } from "motion/react-client";
import React, { useState } from "react";

// icons
import { FaChevronDown } from "react-icons/fa6";

const FAQ = () => {
  const [isAccordingOpen, setIsAccordingOpen] = useState(0);

  // according data
  const accordingData = [
    {
      title: "What is the purpose of this website?",
      description:
        "This website is dedicated to exploring the history of ancient Rome. We strive to offer in-depth articles and interactive timelines to our visitors.",
    },
    {
      title: "Who is this website for?",
      description:
        "This website is designed for history buffs who are passionate about ancient Rome. Whether you're a seasoned expert or just starting your journey, we have something for everyone.",
    },
    {
      title: "What makes this website unique?",
      description: `Our website features exclusive interviews with leading historians. We aim to provide a unique and enriching experience for all our visitors.`,
    },

    {
      title: `How often is this website updated?`,
      description: `We are committed to providing fresh and engaging content. You can expect regular updates, including new blog posts every week. We strive to keep you informed and inspired with the latest information and insights.`,
    },

    {
      title: `What is the significance of color theory in design`,
      description: `Color theory guides the selection and combination of colors to evoke specific emotions, enhance readability, and create visually appealing designs.`,
    },
  ];

  const handleClick = (index) =>
    setIsAccordingOpen((prevIndex) => (prevIndex === index ? null : index));

  return (
    <div className=" w-11/12 mx-auto my-24">
      <h3 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
        Additional Details
      </h3>
      <div className="flex gap-3 flex-col rounded-xl p-5 border ">
        {accordingData?.map((according, index) => (
          <article
            key={index}
            className={` rounded py-3 border-b  ${
              index === 4 && "border-none"
            }`}
          >
            <div
              className="flex gap-2 cursor-pointer items-center justify-between w-full"
              onClick={() => handleClick(index)}
            >
              <h2 className="text-gray-700 font-semibold text-[1.2rem] dark:text-white">
                {according.title}
              </h2>
              <p>
                <FaChevronDown
                  className={`text-[1.2rem] text-[#424242] transition-all duration-300 dark:text-white ${
                    isAccordingOpen === index && "rotate-[180deg] !text-red-600"
                  }`}
                />
              </p>
            </div>
            <div
              className={`grid transition-all duration-300 overflow-hidden ease-in-out  ${
                isAccordingOpen === index
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="text-[#424242] text-[0.9rem] overflow-hidden dark:text-gray-300">
                {according.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

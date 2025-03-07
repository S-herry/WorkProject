import React from "react";
import Header from "./Header";
import TabSection from "./TabSection";
import WelcomeMessage from "./WelcomeMessage";

const MainContent: React.FC = () => {
  return (
    <section className="flex-1 p-8 max-sm:p-5">
      <Header />
      <TabSection />
      <WelcomeMessage />
    </section>
  );
};

export default MainContent;

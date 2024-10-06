import React from "react";

import Footer from "@/components/Footer";
import GetStarted from "@/components/landing-page/GetStarted";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import Services from "@/components/landing-page/Services";

const Page = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 py-12">
      <div className="mx-auto w-full max-w-4xl rounded-xl border-2 border-gray-300 bg-gray-50 bg-dots text-xl shadow-xl [background-size:48px_48px] lg:max-w-7xl">
        <Navbar />
        <div className="flex-grow px-4 py-16 md:px-8 xl:px-16">
          <Hero />
          <Services />
          <GetStarted />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;

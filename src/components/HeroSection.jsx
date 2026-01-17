import React from "react";
import {
  ChevronDownIcon,
  StarIcon,
  PlayIcon,
  CheckIcon,
} from "@heroicons/react/outline";
import { UserGroupIcon } from "@heroicons/react/outline";
import DonationWidget from "./DonationWidget";
import Navigation from "./Navigation";

const HeroSection = () => {
  const handleDonation = (amount) => {
    console.log(`Processing donation of $${amount}`);
    // Handle donation processing
  };

  const handleVolunteer = () => {
    console.log("Navigate to volunteer signup");
    // Navigate to volunteer page
  };

  const handleWatchVideo = () => {
    console.log("Play video");
    // Open video modal or navigate to video
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/mainhero.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Navigation />
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Content */}
        <div className="relative">
          <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-8 py-16">
            <div className="text-center max-w-4xl">
              <div className="mb-6">
                <span className="badge badge-primary mb-4 bg-white/90 text-primary-700">
                  <StarIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                  Trusted by 10,000+ donors worldwide
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Creating
                <span className="text-gradient"> Lasting Change </span>
                Together
              </h1>

              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                CVWF empowers communities through sustainable programs in
                education, healthcare, and economic development. Every
                contribution creates ripples of positive change that last for
                generations.
              </p>

              {/* Quick Donation Section */}
              <div className="mb-8">
                <DonationWidget onDonationClick={handleDonation} />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleVolunteer}
                  className="bg-primary-700 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-800 transition-colors duration-200 flex items-center justify-center text-lg focus-visible-ring"
                >
                  Join as Volunteer
                  <UserGroupIcon className="w-6 h-6 ml-2" aria-hidden="true" />
                </button>

                <button
                  onClick={handleWatchVideo}
                  className="bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-lg focus-visible-ring"
                >
                  <PlayIcon className="w-6 h-6 mr-2" aria-hidden="true" />
                  Watch Our Story
                </button>
              </div>
            </div>
          </div>

          {/* Floating Stats Card */}
          <div className="absolute bottom-6 right-6 bg-white rounded-xl shadow-xl p-6 hidden lg:block">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <CheckIcon
                  className="w-6 h-6 text-secondary-600"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-700">98%</p>
                <p className="text-sm text-gray-600">Program Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDownIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
        <span className="sr-only">Scroll down to learn more</span>
      </div>
    </section>
  );
};

export default HeroSection;

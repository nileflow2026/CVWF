import React from "react";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { FEATURED_PROGRAMS } from "../data/constants";
import ProgramCard from "./ProgramCard";

const FeaturedPrograms = () => {
  const handleDonate = (programId) => {
    // Handle donation for specific program
    console.log(`Donate to program ${programId}`);
  };

  const handleLearnMore = (programId) => {
    // Handle learn more for specific program
    console.log(`Learn more about program ${programId}`);
  };

  const handleViewAll = () => {
    // Navigate to all programs page
    console.log("View all programs");
  };

  return (
    <section
      id="programs"
      className="section bg-white"
      aria-labelledby="programs-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 id="programs-heading" className="section-title">
            Active Programs
          </h2>
          <p className="section-subtitle">
            See how your donations are making a direct impact in these current
            initiatives
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {FEATURED_PROGRAMS.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onDonate={handleDonate}
              onLearnMore={handleLearnMore}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleViewAll}
            className="btn-ghost inline-flex items-center"
            aria-label="View all programs"
          >
            View All Programs
            <ArrowRightIcon className="w-5 h-5 ml-2" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;

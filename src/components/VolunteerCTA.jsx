import React from "react";
import { UserGroupIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const VolunteerCTA = () => {
  const handleApplyVolunteer = () => {
    console.log("Navigate to volunteer application");
    // Navigate to volunteer application form
  };

  const handleLearnMore = () => {
    console.log("Navigate to volunteer info page");
    // Navigate to volunteer information page
  };

  return (
    <section
      id="volunteer"
      className="section bg-gradient-to-r from-primary-700 to-primary-600 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Join our global community of volunteers and be part of sustainable
          change. Whether you have 2 hours or 2 months, there's a way for you to
          contribute.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <UserGroupIcon
              className="w-12 h-12 mx-auto mb-4 opacity-90"
              aria-hidden="true"
            />
            <h3 className="text-xl font-semibold mb-3">Remote Volunteers</h3>
            <p className="opacity-90 mb-4">
              Support our mission from anywhere with skills in marketing,
              design, writing, or administration.
            </p>
            <ul className="text-left text-sm opacity-80 space-y-1" role="list">
              <li>• Flexible scheduling</li>
              <li>• Skills-based matching</li>
              <li>• Virtual team collaboration</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <GlobeAltIcon
              className="w-12 h-12 mx-auto mb-4 opacity-90"
              aria-hidden="true"
            />
            <h3 className="text-xl font-semibold mb-3">Field Volunteers</h3>
            <p className="opacity-90 mb-4">
              Work directly with communities on education, healthcare, and
              development projects.
            </p>
            <ul className="text-left text-sm opacity-80 space-y-1" role="list">
              <li>• 2-12 week programs</li>
              <li>• Full support provided</li>
              <li>• Cultural immersion</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleApplyVolunteer}
            className="bg-white text-primary-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 text-lg focus-visible-ring"
          >
            Apply to Volunteer
          </button>
          <button
            onClick={handleLearnMore}
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200 text-lg focus-visible-ring"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default VolunteerCTA;

import React from "react";
import {
  HeartIcon,
  UserGroupIcon,
  GlobeAltIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { IMPACT_STATS } from "../data/constants";

const iconMap = {
  lives: HeartIcon,
  programs: GlobeAltIcon,
  volunteers: UserGroupIcon,
  funds: StarIcon,
};

const ImpactStats = () => {
  return (
    <section
      className="section bg-brand-light"
      aria-labelledby="impact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 id="impact-heading" className="section-title">
            Our Global Impact
          </h2>
          <p className="section-subtitle">
            Together, we're making a measurable difference in communities
            worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {IMPACT_STATS.map((stat, index) => {
            const IconComponent = iconMap[stat.metric] || HeartIcon;

            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent
                    className="w-8 h-8 text-secondary-600"
                    aria-hidden="true"
                  />
                </div>
                <p
                  className="text-3xl font-bold text-primary-700 mb-2"
                  aria-label={`${stat.number} ${stat.label}`}
                >
                  {stat.number}
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;

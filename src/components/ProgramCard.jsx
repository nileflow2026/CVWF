import React from "react";
import ProgressBar from "./ProgressBar";

const ProgramCard = ({ program, onDonate, onLearnMore }) => {
  const { id, title, description, raised, goal, image, urgent } = program;

  return (
    <article className="card">
      {urgent && (
        <div
          className="bg-secondary-500 text-white px-4 py-2 text-sm font-medium"
          role="alert"
        >
          ⚡ URGENT: Help needed now
        </div>
      )}

      <div className="relative">
        <img
          src={image}
          alt={`${title} program`}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
          {Math.round((raised / goal) * 100)}% funded
        </div>
      </div>

      <div className="card-body">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        <ProgressBar
          current={raised}
          goal={goal}
          className="mb-4"
          showPercentage={false}
        />

        <div className="flex gap-3">
          <button
            onClick={() => onDonate && onDonate(id)}
            className="flex-1 btn-primary"
            aria-label={`Donate to ${title}`}
          >
            Donate Now
          </button>
          <button
            onClick={() => onLearnMore && onLearnMore(id)}
            className="btn-secondary"
            aria-label={`Learn more about ${title}`}
          >
            Learn More
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProgramCard;

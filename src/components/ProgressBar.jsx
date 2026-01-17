import React from "react";

const ProgressBar = ({
  current,
  goal,
  className = "",
  showPercentage = true,
}) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className={`space-y-2 ${className}`}>
      {showPercentage && (
        <div className="flex justify-between text-sm text-gray-600">
          <span>Raised: ${current.toLocaleString()}</span>
          <span>Goal: ${goal.toLocaleString()}</span>
        </div>
      )}
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
          aria-label={`${Math.round(percentage)}% funded`}
        />
      </div>
      {showPercentage && (
        <div className="text-xs text-gray-500 text-center">
          {Math.round(percentage)}% funded
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import { QUICK_DONATION_AMOUNTS } from "../data/constants";

const DonationWidget = ({ onDonationClick }) => {
  const [donationAmount, setDonationAmount] = useState(50);

  const handleAmountChange = (amount) => {
    setDonationAmount(amount);
  };

  const handleCustomAmountChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setDonationAmount(value);
  };

  const handleDonate = () => {
    if (onDonationClick) {
      onDonationClick(donationAmount);
    }
    // Handle donation logic here
    console.log(`Donating $${donationAmount}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center lg:text-left">
        Make an impact today
      </h3>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {QUICK_DONATION_AMOUNTS.map((amount) => (
          <button
            key={amount}
            onClick={() => handleAmountChange(amount)}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 focus-visible-ring ${
              donationAmount === amount
                ? "bg-primary-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
            }`}
            aria-pressed={donationAmount === amount}
            aria-label={`Donate $${amount}`}
          >
            ${amount}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <div className="flex-1">
          <label htmlFor="donation-amount" className="sr-only">
            Custom donation amount in dollars
          </label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              aria-hidden="true"
            >
              $
            </span>
            <input
              id="donation-amount"
              type="number"
              min="1"
              max="10000"
              value={donationAmount}
              onChange={handleCustomAmountChange}
              className="form-input w-full pl-8 pr-4 py-3"
              placeholder="Enter amount"
              aria-describedby="donation-help"
            />
          </div>
        </div>
        <button
          onClick={handleDonate}
          className="btn-primary flex items-center justify-center"
          disabled={!donationAmount || donationAmount < 1}
          aria-describedby="donation-help"
        >
          Donate ${donationAmount}
          <HeartIcon className="w-5 h-5 ml-2" aria-hidden="true" />
        </button>
      </div>

      <p
        id="donation-help"
        className="text-xs text-gray-500 text-center lg:text-left"
      >
        ✓ 100% secure • ✓ Tax deductible • ✓ Instant receipt
      </p>
    </div>
  );
};

export default DonationWidget;

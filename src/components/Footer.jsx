import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/mainlogo.png"
                alt="CVOWF Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="ml-3 text-2xl font-bold">CVWF</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Creating sustainable change through community-focused programs in
              education, healthcare, and economic development worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/cvwf"
                className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center hover:bg-secondary-500 transition-colors duration-200 focus-visible-ring"
                aria-label="Follow us on Facebook"
              >
                <span className="text-sm font-bold">f</span>
              </a>
              <a
                href="https://twitter.com/cvwf"
                className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center hover:bg-secondary-500 transition-colors duration-200 focus-visible-ring"
                aria-label="Follow us on Twitter"
              >
                <span className="text-sm font-bold">t</span>
              </a>
              <a
                href="https://instagram.com/cvwf"
                className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center hover:bg-secondary-500 transition-colors duration-200 focus-visible-ring"
                aria-label="Follow us on Instagram"
              >
                <span className="text-sm font-bold">i</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav role="navigation" aria-label="Footer navigation">
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="#programs"
                    className="hover:text-white transition-colors duration-200 focus-visible-ring"
                  >
                    Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#impact"
                    className="hover:text-white transition-colors duration-200 focus-visible-ring"
                  >
                    Impact
                  </a>
                </li>
                <li>
                  <a
                    href="#volunteer"
                    className="hover:text-white transition-colors duration-200 focus-visible-ring"
                  >
                    Volunteer
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors duration-200 focus-visible-ring"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-300 text-sm space-y-1">
              <p>
                <a
                  href="mailto:info@cvwf.org"
                  className="hover:text-white transition-colors duration-200 focus-visible-ring"
                >
                  info@cvwf.org
                </a>
              </p>
              <p>
                <a
                  href="tel:+15551234567"
                  className="hover:text-white transition-colors duration-200 focus-visible-ring"
                >
                  +1 (555) 123-4567
                </a>
              </p>
              <p className="pt-2">
                123 Impact Street
                <br />
                Change City, CC 12345
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} CVWF. All rights reserved.
          </p>
          <nav
            className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0"
            role="navigation"
            aria-label="Legal navigation"
          >
            <a
              href="/privacy"
              className="hover:text-white transition-colors duration-200 focus-visible-ring"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-white transition-colors duration-200 focus-visible-ring"
            >
              Terms of Service
            </a>
            <a
              href="/reports"
              className="hover:text-white transition-colors duration-200 focus-visible-ring"
            >
              Annual Reports
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

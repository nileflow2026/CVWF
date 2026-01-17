import React, { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { NAVIGATION_LINKS } from "../data/constants";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;

      // Change background when scrolled past 80% of hero section
      setIsScrolled(scrollPosition > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/mainlogo.png"
                alt="CVWF Logo"
                className="w-16 h-16 object-contain"
              />
              <span className="ml-3 text-2xl font-bold text-white hidden sm:block">
                CVWF
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible-ring"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="btn-secondary">Volunteer</button>
            <button className="btn-primary">Donate Now</button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-200 p-2 focus-visible-ring"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle main menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-600 animate-slide-down"
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            <nav role="navigation" aria-label="Mobile navigation">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-white hover:text-gray-200 text-base font-medium focus-visible-ring"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-4 space-y-2">
              <button className="w-full btn-secondary">Volunteer</button>
              <button className="w-full btn-primary">Donate Now</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;

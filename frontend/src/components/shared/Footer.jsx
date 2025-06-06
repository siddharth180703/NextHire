import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 border-t border-gray-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Branding */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-white">NextHire</h2>
          <p className="text-sm mt-1">© 2025 NextHire. All rights reserved.</p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 text-gray-400">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="hover:text-white transition duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={22} />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="hover:text-white transition duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={22} />
          </a>
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="hover:text-white transition duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

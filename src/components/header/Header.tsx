"use client";

import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faStar } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-gray-800/30 ">
        <div className="container mx-auto items-center flex justify-between p-4">
          <button className="focus:outline-none">
            <div className="flex items-center space-x-2"></div>
            {/*hamburger menu */}
            <div>
              <div className="space-y-1" onClick={() => setIsOpen(!isOpen)}>
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
              </div>
            </div>
          </button>

          {isOpen && (
            <div className="bg-gray-400 p-4 space-y-2">
              <a href="#" className="text-white hover:text-gray-300">
                Home
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                Sacrifice
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                Pawn
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                Different
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;

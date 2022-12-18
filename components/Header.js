import React from "react";

function Header() {
  return (
    <div className="flex justify-evenly ">
      {/* logo */}
      <img src="/logo192.png" alt="" className="w-40" />
      {/* Content */}
      <div className="flex items-center justify-evenly">
        {/* 1st */}
        <div className="flex items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 border rounded-full"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <div className="flex flex-col p-1">
            <h3>FOR SUPPORT MAIL US:</h3>
            <h5>info@gmail.com</h5>
          </div>
        </div>
        {/* 2nd */}
        <div className="flex text-white">
          {/* symbol */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 border rounded-full"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <div>
            <h3>FOR SUPPORT MAIL US:</h3> <h5>info@gmail.com</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

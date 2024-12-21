import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Click N Buy. All Rights Reserved.</p>
        <div className="mt-4">
          <a href="#privacy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
          <a href="#terms" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

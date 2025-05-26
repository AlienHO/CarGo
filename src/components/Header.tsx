import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-green-100 shadow z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-green-800">
          CarGo
        </Link>
        <div className="flex-1 mx-4">
          <input 
            type="text" 
            placeholder="Search for vehicles..." 
            className="w-full px-4 py-2 rounded-full border border-green-300 focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="space-x-4 flex items-center">
          <a href="#" className="text-sm text-green-700">EN / 中文</a>
          <a href="#" className="text-sm text-green-700">Login</a>
          <a href="#" className="text-sm text-green-700">Register</a>
          <a href="#" className="text-green-700">
            <i className="far fa-heart"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

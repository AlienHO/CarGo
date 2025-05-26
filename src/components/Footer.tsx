import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">CarGo</h3>
          <p className="text-green-200">
            Your trusted partner for exporting quality Chinese used cars to the world.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-green-200 hover:text-white">Home</a></li>
            <li><a href="#" className="text-green-200 hover:text-white">Vehicles</a></li>
            <li><a href="#" className="text-green-200 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-green-200 hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-green-200 hover:text-white">Export Services</a></li>
            <li><a href="#" className="text-green-200 hover:text-white">Logistics</a></li>
            <li><a href="#" className="text-green-200 hover:text-white">Documentation</a></li>
            <li><a href="#" className="text-green-200 hover:text-white">Support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <div className="space-y-2 text-green-200">
            <p>Email: info@cargo.com</p>
            <p>Phone: +86 123 456 7890</p>
            <p>Address: Shanghai, China</p>
          </div>
        </div>
      </div>
      <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
        <p>&copy; 2024 CarGo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import VehicleCard from '../components/VehicleCard';

const Home: React.FC = () => {
  const featuredVehicles = [
    {
      id: 1,
      name: "BYD Han EV",
      price: "$19,500",
      image: "https://i.pinimg.com/736x/14/ad/61/14ad61cde436ca462d25e3e70fb8e629.jpg",
      available: true
    },
    {
      id: 2,
      name: "Great Wall Wingle",
      price: "Sold Out",
      image: "https://i.pinimg.com/736x/1e/3e/28/1e3e28daf85ca25c1906cb5cb04e2b1c.jpg",
      available: false
    },
    {
      id: 3,
      name: "Geely Icon",
      price: "$10,800",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      available: true
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-visible z-20 pt-24 bg-green-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center py-8">
          <div className="lg:w-1/2 space-y-6 z-30">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-900">
              Discover Trusted Used Cars from China
            </h1>
            <p className="text-green-800 text-base lg:text-lg">
              Reliable exports. Global delivery. Secure transactions for international buyers.
            </p>
            <a
              href="#vehicles"
              className="inline-block bg-green-700 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-800 transition-colors"
            >
              Start Shopping
            </a>
          </div>
          
          {/* 右侧空间预留给浮动图片 */}
          <div className="lg:w-1/2 relative mt-8 lg:mt-0">
            <img
              src="https://videos.openai.com/vg-assets/assets%2Ftask_01jw5q1rv0f438v898f3eww8nq%2F1748243710_img_1.webp?st=2025-05-26T05%3A25%3A24Z&se=2025-06-01T06%3A25%3A24Z&sks=b&skt=2025-05-26T05%3A25%3A24Z&ske=2025-06-01T06%3A25%3A24Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=iFbWBAI8BbAJ%2BRu1CSAd0El%2FsxzhB286Wh%2FwWHGnTmg%3D&az=oaivgprodscus"
              alt="Car Export"
              className="
                block w-100 h-auto mx-auto
                transform hover:scale-105 transition-transform duration-300
                drop-shadow-2xl
              "
            />
          </div>
        </div>
      </section>

      {/* Feature Filters */}
      <section className="bg-white py-12" id="vehicles">
        <div className="max-w-7xl mx-auto px-4 lg:pr-40 xl:pr-48 2xl:pr-56">
          <h2 className="text-3xl font-bold mb-6 text-green-900">Find Your Perfect Vehicle</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <select className="p-3 rounded-lg border border-green-300">
              <option>Energy Type</option>
              <option>Gasoline</option>
              <option>Electric</option>
              <option>Hybrid</option>
            </select>
            <select className="p-3 rounded-lg border border-green-300">
              <option>Vehicle Type</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Truck</option>
            </select>
            <select className="p-3 rounded-lg border border-green-300">
              <option>Brand</option>
              <option>BYD</option>
              <option>Geely</option>
              <option>Great Wall</option>
            </select>
            <button className="bg-green-700 text-white px-4 py-3 rounded-lg hover:bg-green-800">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="bg-green-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-green-900">Recommended Cars</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/mall" 
              className="inline-block bg-green-700 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-800"
            >
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Advantages */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-900">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <i className="fas fa-globe text-green-700 text-2xl mb-3"></i>
              <h4 className="font-bold mb-2">Global Logistics</h4>
              <p>We export vehicles worldwide with full compliance and tracking.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <i className="fas fa-certificate text-green-700 text-2xl mb-3"></i>
              <h4 className="font-bold mb-2">Certified Listings</h4>
              <p>All vehicles are inspected and documented before shipment.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <i className="fas fa-headset text-green-700 text-2xl mb-3"></i>
              <h4 className="font-bold mb-2">Multilingual Service</h4>
              <p>Support in English, Chinese, and more to serve global buyers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

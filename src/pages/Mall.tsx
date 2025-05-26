import React, { useState } from 'react';
import VehicleCard from '../components/VehicleCard';

interface Filters {
  energyType: string;
  vehicleType: string;
  brand: string;
}

interface Vehicle {
  id: number;
  name: string;
  price: string;
  image: string;
  available: boolean;
  energyType: string;
  vehicleType: string;
  brand: string;
}

const Mall: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    energyType: '',
    vehicleType: '',
    brand: ''
  });

  // Mock data for vehicles
  const vehicles: Vehicle[] = [
    {
      id: 1,
      name: "BYD Han EV",
      price: "$19,500",
      image: "https://i.pinimg.com/736x/14/ad/61/14ad61cde436ca462d25e3e70fb8e629.jpg",
      available: true,
      energyType: "Electric",
      vehicleType: "Sedan",
      brand: "BYD"
    },
    {
      id: 2,
      name: "Great Wall Wingle",
      price: "Sold Out",
      image: "https://i.pinimg.com/736x/1e/3e/28/1e3e28daf85ca25c1906cb5cb04e2b1c.jpg",
      available: false,
      energyType: "Gasoline",
      vehicleType: "Truck",
      brand: "Great Wall"
    },
    {
      id: 3,
      name: "Geely Icon",
      price: "$10,800",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      available: true,
      energyType: "Gasoline",
      vehicleType: "SUV",
      brand: "Geely"
    },
    {
      id: 4,
      name: "BYD Song Pro",
      price: "$15,200",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
      available: true,
      energyType: "Electric",
      vehicleType: "SUV",
      brand: "BYD"
    },
    {
      id: 5,
      name: "Geely Coolray",
      price: "$12,500",
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753",
      available: true,
      energyType: "Gasoline",
      vehicleType: "SUV",
      brand: "Geely"
    },
    {
      id: 6,
      name: "Great Wall H6",
      price: "$14,800",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      available: true,
      energyType: "Gasoline",
      vehicleType: "SUV",
      brand: "Great Wall"
    }
  ];

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    return (
      (filters.energyType === '' || vehicle.energyType === filters.energyType) &&
      (filters.vehicleType === '' || vehicle.vehicleType === filters.vehicleType) &&
      (filters.brand === '' || vehicle.brand === filters.brand)
    );
  });

  return (
    <main className="pt-24 max-w-7xl mx-auto px-4 flex-grow">
      {/* Filters */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-green-900">Filter Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select 
            className="p-3 rounded-lg border border-green-300"
            value={filters.energyType}
            onChange={(e) => handleFilterChange('energyType', e.target.value)}
          >
            <option value="">Energy Type</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <select 
            className="p-3 rounded-lg border border-green-300"
            value={filters.vehicleType}
            onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
          >
            <option value="">Vehicle Type</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
          </select>
          <select 
            className="p-3 rounded-lg border border-green-300"
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
          >
            <option value="">Brand</option>
            <option value="BYD">BYD</option>
            <option value="Geely">Geely</option>
            <option value="Great Wall">Great Wall</option>
          </select>
          <button 
            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700"
            onClick={() => setFilters({ energyType: '', vehicleType: '', brand: '' })}
          >
            Clear Filters
          </button>
        </div>
      </section>

      {/* Vehicle Cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-green-900">
          Available Cars ({filteredVehicles.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No vehicles found matching your filters.</p>
            <button 
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              onClick={() => setFilters({ energyType: '', vehicleType: '', brand: '' })}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredVehicles.length > 0 && (
          <div className="mt-8 flex justify-center space-x-2">
            <button className="px-4 py-2 bg-green-700 text-white rounded">1</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">2</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">3</button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Mall;

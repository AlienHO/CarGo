import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface VehicleSpecs {
  year: string;
  mileage: string;
  energyType: string;
  transmission: string;
  location: string;
}

interface VehicleData {
  name: string;
  price: string;
  image: string;
  description: string;
  specs: VehicleSpecs;
  features: string[];
}

interface VehicleDatabase {
  [key: string]: VehicleData;
}

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock vehicle data - in real app, this would come from API
  const vehicleData: VehicleDatabase = {
    1: {
      name: "BYD Han EV 2022",
      price: "$19,500",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
      description: "A premium electric sedan with cutting-edge features, designed for international markets. High range and reliable build quality make this a standout choice for overseas buyers.",
      specs: {
        year: "2022",
        mileage: "45,000 km",
        energyType: "Electric",
        transmission: "Automatic",
        location: "Shanghai, China"
      },
      features: [
        "Long-range battery (550km)",
        "Fast charging capability",
        "Premium interior",
        "Advanced safety features",
        "Export documentation ready"
      ]
    },
    3: {
      name: "Geely Icon 2021",
      price: "$10,800",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      description: "Compact SUV with modern design and reliable performance. Perfect for urban driving with good fuel efficiency.",
      specs: {
        year: "2021",
        mileage: "38,000 km",
        energyType: "Gasoline",
        transmission: "Manual",
        location: "Beijing, China"
      },
      features: [
        "Fuel efficient engine",
        "Spacious interior",
        "Modern infotainment",
        "Good safety ratings",
        "Export ready"
      ]
    }
  };

  const vehicle = id ? vehicleData[id] : undefined;

  if (!vehicle) {
    return (
      <main className="pt-24 max-w-7xl mx-auto px-4 flex-grow">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-600">Vehicle not found</h1>
          <Link to="/mall" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg">
            Back to Mall
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 max-w-7xl mx-auto px-4 py-12 flex-grow">
      <div className="mb-4">
        <Link to="/mall" className="text-green-600 hover:text-green-800">
          ← Back to Mall
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={vehicle.image} 
            alt={vehicle.name} 
            className="rounded-xl w-full shadow-lg"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-green-900 mb-4">{vehicle.name}</h1>
          <p className="text-xl font-semibold text-green-700 mb-4">{vehicle.price}</p>
          <p className="mb-6 text-gray-700">{vehicle.description}</p>

          {/* Specifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><strong>Year:</strong> {vehicle.specs.year}</div>
              <div><strong>Mileage:</strong> {vehicle.specs.mileage}</div>
              <div><strong>Energy Type:</strong> {vehicle.specs.energyType}</div>
              <div><strong>Transmission:</strong> {vehicle.specs.transmission}</div>
              <div className="col-span-2"><strong>Location:</strong> {vehicle.specs.location}</div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {vehicle.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-800">
              Contact Seller
            </button>
            <button className="w-full border border-green-700 text-green-700 py-3 rounded-lg font-medium hover:bg-green-50">
              Request More Info
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50">
              Add to Favorites ♡
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Export Information</h3>
        <p className="text-sm text-gray-700">
          This vehicle is ready for international export. We handle all documentation, 
          customs procedures, and shipping arrangements. Estimated delivery time is 3-6 weeks 
          depending on destination. Full inspection reports and export certificates available upon request.
        </p>
      </div>
    </main>
  );
};

export default VehicleDetails;

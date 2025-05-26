import React from 'react';
import { Link } from 'react-router-dom';

interface Vehicle {
  id: number;
  name: string;
  price: string;
  image: string;
  available: boolean;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="relative aspect-4-3 overflow-hidden rounded-xl mb-4">
        <img 
          src={vehicle.image} 
          alt={vehicle.name} 
          className="w-full h-full object-cover"
        />
        {!vehicle.available && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <span className="text-red-500 font-bold text-lg uppercase">Sold Out</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold">{vehicle.name}</h3>
      <p className={`text-xl font-bold ${vehicle.available ? 'text-green-700' : 'text-red-600'}`}>
        {vehicle.price}
      </p>
      {vehicle.available ? (
        <Link 
          to={`/vehicle/${vehicle.id}`} 
          className="text-green-600 text-sm underline"
        >
          View Details
        </Link>
      ) : (
        <span className="text-gray-500 text-sm">Not Available</span>
      )}
    </div>
  );
};

export default VehicleCard;

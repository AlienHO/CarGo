import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  name: string;
  brand: string;
  type: string;
  energyType: string;
  mileage: string;
  price: string;
  location: string;
  description: string;
  imageUrl: string;
}

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  type: string;
  energyType: string;
  mileage: string;
  price: string;
  location: string;
  status: string;
  description: string;
  imageUrl: string;
}

const AdminPanel: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    brand: '',
    type: '',
    energyType: '',
    mileage: '',
    price: '',
    location: '',
    description: '',
    imageUrl: ''
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      name: "BYD Han EV",
      brand: "BYD",
      type: "Sedan",
      energyType: "Electric",
      price: "$19,500",
      status: "Available",
      mileage: '',
      location: '',
      description: '',
      imageUrl: ''
    },
    {
      id: 2,
      name: "Great Wall Wingle",
      brand: "Great Wall",
      type: "Truck",
      energyType: "Gasoline",
      price: "Sold Out",
      status: "Sold",
      mileage: '',
      location: '',
      description: '',
      imageUrl: ''
    },
    {
      id: 3,
      name: "Geely Icon",
      brand: "Geely",
      type: "SUV",
      energyType: "Gasoline",
      price: "$10,800",
      status: "Available",
      mileage: '',
      location: '',
      description: '',
      imageUrl: ''
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVehicle: Vehicle = {
      id: Date.now(), // Use timestamp as ID
      ...formData,
      status: "Available"
    };
    setVehicles(prev => [...prev, newVehicle]);
    setFormData({
      name: '',
      brand: '',
      type: '',
      energyType: '',
      mileage: '',
      price: '',
      location: '',
      description: '',
      imageUrl: ''
    });
    alert('Vehicle added successfully!');
  };

  const toggleVehicleStatus = (id: number) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === id 
        ? { ...vehicle, status: vehicle.status === 'Available' ? 'Sold' : 'Available' }
        : vehicle
    ));
  };

  const deleteVehicle = (id: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 flex flex-col min-h-screen">
      <header className="bg-green-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">CarGo Admin</h1>
          <Link to="/" className="text-sm hover:underline">Back to Site</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Vehicle Inventory Management</h2>

        {/* Vehicle Upload Form */}
        <section className="mb-10 bg-white shadow p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Vehicle</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Vehicle Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Vehicle Type</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Truck">Truck</option>
              <option value="Hatchback">Hatchback</option>
            </select>
            <select
              name="energyType"
              value={formData.energyType}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Energy Type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <input
              type="text"
              name="mileage"
              placeholder="Mileage (km)"
              value={formData.mileage}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price (USD)"
              value={formData.price}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="url"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <textarea
              name="description"
              placeholder="Vehicle Description"
              value={formData.description}
              onChange={handleInputChange}
              className="border p-2 rounded md:col-span-2"
              rows={3}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 md:col-span-2"
            >
              Add Vehicle
            </button>
          </form>
        </section>

        {/* Vehicle List */}
        <section className="bg-white shadow rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold p-4 bg-gray-50 border-b">Current Inventory</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Brand</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Energy</th>
                  <th className="text-left p-3">Price</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(vehicle => (
                  <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{vehicle.name}</td>
                    <td className="p-3">{vehicle.brand}</td>
                    <td className="p-3">{vehicle.type}</td>
                    <td className="p-3">{vehicle.energyType}</td>
                    <td className="p-3">{vehicle.price}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        vehicle.status === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleVehicleStatus(vehicle.id)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Toggle Status
                      </button>
                      <button
                        onClick={() => deleteVehicle(vehicle.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;

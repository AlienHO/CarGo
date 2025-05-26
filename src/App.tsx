import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mall from './pages/Mall';
import VehicleDetails from './pages/VehicleDetails';
import AdminPanel from './pages/AdminPanel';

const App: React.FC = () => {
  return (
    <div className="bg-green-50 text-gray-800 flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mall" element={<Mall />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

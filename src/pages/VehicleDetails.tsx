import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface VehicleSpecs {
  year: string;
  mileage: string;
  energyType: string;
  transmission: string;
  location: string;
  condition?: string;
  registration?: string;
  color?: string;
  engine?: string;
}

interface VehicleOptions {
  interior: string[];
  exterior: string[];
  safety: string[];
  technology: string[];
}

interface VehicleData {
  id: string;
  name: string;
  price: string;
  image: string;
  images?: string[];
  description: string;
  specs: VehicleSpecs;
  features: string[];
  options?: VehicleOptions;
  certified?: boolean;
  inspectionScore?: number;
  asisCondition?: string[];
}

interface VehicleDatabase {
  [key: string]: VehicleData;
}

// 定义页面锚点类型
type SectionType = 'details' | 'configuration' | 'dentMap' | 'inspection' | 'certified' | 'recommended';

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeSection, setActiveSection] = useState<SectionType>('details');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Create section references for anchor navigation
  const sectionRefs = {
    details: useRef<HTMLDivElement>(null),
    configuration: useRef<HTMLDivElement>(null),
    dentMap: useRef<HTMLDivElement>(null),
    inspection: useRef<HTMLDivElement>(null),
    certified: useRef<HTMLDivElement>(null),
    recommended: useRef<HTMLDivElement>(null)
  };
  
  // 滚动到指定部分
  const scrollToSection = (section: SectionType) => {
    setActiveSection(section);
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mock vehicle data - in real app, this would come from API
  const vehicleData: VehicleDatabase = {
    1: {
      id: "1",
      name: "BYD Han EV 2022",
      price: "$19,500",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
      images: [
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
        "https://images.unsplash.com/photo-1554744512-d6c603f27c54",
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc"
      ],
      description: "A premium electric sedan with cutting-edge features, designed for international markets. High range and reliable build quality make this a standout choice for overseas buyers.",
      specs: {
        year: "2022",
        mileage: "45,000 km",
        energyType: "Electric",
        transmission: "Automatic",
        location: "Shanghai, China",
        condition: "Excellent",
        registration: "May 2022",
        color: "Midnight Blue",
        engine: "Electric Motor 308 kW"
      },
      features: [
        "Long-range battery (550km)",
        "Fast charging capability",
        "Premium interior",
        "Advanced safety features",
        "Export documentation ready"
      ],
      options: {
        interior: ["Leather seats", "Heated seats", "Ambient lighting", "Panoramic sunroof"],
        exterior: ["19-inch alloy wheels", "LED headlights", "Power folding mirrors"],
        safety: ["Adaptive cruise control", "Lane departure warning", "Automatic emergency braking"],
        technology: ["10.4-inch touchscreen", "Wireless charging", "360° camera"]
      },
      certified: true,
      inspectionScore: 92,
      asisCondition: ["Minor scratch on rear bumper", "Original tires with 70% tread remaining"]
    },
    3: {
      id: "3",
      name: "Geely Icon 2021",
      price: "$10,800",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      images: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
        "https://images.unsplash.com/photo-1570733577524-3a047079e80d"
      ],
      description: "Compact SUV with modern design and reliable performance. Perfect for urban driving with good fuel efficiency.",
      specs: {
        year: "2021",
        mileage: "38,000 km",
        energyType: "Gasoline",
        transmission: "Manual",
        location: "Beijing, China",
        condition: "Good",
        registration: "August 2021",
        color: "Silver",
        engine: "1.5L Turbo"
      },
      features: [
        "Fuel efficient engine",
        "Spacious interior",
        "Modern infotainment",
        "Good safety ratings",
        "Export ready"
      ],
      options: {
        interior: ["Fabric seats", "Dual-zone climate control", "Rear AC vents"],
        exterior: ["17-inch alloy wheels", "LED daytime running lights", "Roof rails"],
        safety: ["6 airbags", "ABS with EBD", "Hill start assist"],
        technology: ["8-inch infotainment", "6-speaker sound system", "Reverse camera"]
      },
      certified: true,
      inspectionScore: 88,
      asisCondition: ["Small dent on driver door", "Replaced front bumper"]
    }
  };

  const vehicle = id ? vehicleData[id] : undefined;

  // Navigation component - click to jump to corresponding section
  // Add intersection observer for section highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -60% 0px', // Top margin to account for header
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id as SectionType;
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section refs
    Object.keys(sectionRefs).forEach(key => {
      const ref = sectionRefs[key as SectionType];
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const SectionNavigation = () => {
    const sections: Array<{id: SectionType; label: string}> = [
      { id: 'details', label: 'Vehicle Details' },
      { id: 'configuration', label: 'Vehicle Configuration' },
      { id: 'dentMap', label: 'Dent Map' },
      { id: 'inspection', label: 'Inspection Report' },
      { id: 'certified', label: 'Certification' },
      { id: 'recommended', label: 'Recommended Vehicles' },
    ];

    return (
      <div className="sticky top-24 bg-white shadow-lg rounded-lg p-4 w-full h-fit">
        <div className="flex flex-col space-y-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-3 py-2 font-medium text-base text-left ${activeSection === section.id 
                ? 'bg-green-600 text-white rounded-md' 
                : 'text-gray-700 hover:bg-gray-100 rounded-md'}`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

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

  // Image carousel component optimized for 16:9 aspect ratio container with slide effects
  const ImageCarousel = () => {
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handlePrevClick = () => {
      if (isAnimating) return;
      setSlideDirection('right');
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentImageIndex(prev => 
          prev === 0 ? (vehicle.images?.length || 1) - 1 : prev - 1
        );
        setTimeout(() => {
          setIsAnimating(false);
          setSlideDirection(null);
        }, 50);
      }, 250);
    };

    const handleNextClick = () => {
      if (isAnimating) return;
      setSlideDirection('left');
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentImageIndex(prev => 
          prev === (vehicle.images?.length || 1) - 1 ? 0 : prev + 1
        );
        setTimeout(() => {
          setIsAnimating(false);
          setSlideDirection(null);
        }, 50);
      }, 250);
    };

    const getSlideClass = () => {
      if (!slideDirection) return '';
      if (slideDirection === 'left') return 'animate-slide-left';
      return 'animate-slide-right';
    };

    return (
      <div className="absolute inset-0 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <img 
          src={vehicle.images?.[currentImageIndex] || vehicle.image} 
          alt={`${vehicle.name} - Image ${currentImageIndex + 1}`} 
          className={`w-full h-full object-cover transition-transform duration-300 ${getSlideClass()}`}
          style={{
            transform: slideDirection === 'left' ? 'translateX(-5%)' : 
                      slideDirection === 'right' ? 'translateX(5%)' : 'translateX(0)',
          }}
        />
        
        {(vehicle.images?.length || 0) > 1 && (
          <>
            <button 
              onClick={handlePrevClick}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
              aria-label="Previous image"
              disabled={isAnimating}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNextClick}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
              aria-label="Next image"
              disabled={isAnimating}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
              {vehicle.images?.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => !isAnimating && setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`Go to image ${index + 1}`}
                  disabled={isAnimating}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Vehicle information card component
  const VehicleInfoCard = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-between">
        {/* Price as main focus with green color and larger size */}
        <div>
          <div className="mb-4">
            <span className="text-4xl font-bold text-green-600">{vehicle.price}</span>
            <p className="text-sm text-gray-500 mt-1">New car reference price: $25,500</p>
          </div>
          
          {/* Vehicle name */}
          <h1 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">{vehicle.name}</h1>
          
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium">{vehicle.specs.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mileage</p>
                <p className="font-medium">{vehicle.specs.mileage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Energy Type</p>
                <p className="font-medium">{vehicle.specs.energyType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Transmission</p>
                <p className="font-medium">{vehicle.specs.transmission}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex space-x-4 mb-6">
            <button className="bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex-1 flex items-center justify-center">
              <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact
            </button>
            <button className="border border-green-600 text-green-600 py-3 px-4 rounded-lg font-medium hover:bg-green-50 transition-colors flex-1 flex items-center justify-center">
              <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Inquire
            </button>
          </div>
          
          {vehicle.certified && (
            <div className="bg-green-50 rounded-lg p-4 flex items-center mb-6">
              <svg className="h-6 w-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium text-green-800">Certified Pre-Owned Vehicle</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render main content and detailed information
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top section with green background */}
      <section className="bg-green-600 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back to Mall link with increased height and further down */}
          <div className="mb-3">
            <Link to="/mall" className="text-white hover:text-green-100 flex items-center py-2 text-base">
              <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Mall
            </Link>
          </div>
          
          {/* Image carousel and info card in 70/30 layout */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            {/* Left side image carousel (70%) */}
            <div className="lg:col-span-7">
              {/* 16:9 aspect ratio container for the image carousel - 固定16:9比例 */}
              <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ paddingBottom: '56.25%' }}>
                <ImageCarousel />
              </div>
              <div className="mt-4 flex overflow-x-auto gap-2 pb-2">
                {vehicle.images?.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 ${currentImageIndex === index ? 'border-2 border-green-500' : 'opacity-80'} rounded-md overflow-hidden`}
                  >
                    <img 
                      src={img} 
                      alt={`${vehicle.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Right side info card (30%) aligned with thumbnails */}
            <div className="lg:col-span-3 self-start flex flex-col gap-4">
              <div className="bg-white rounded-lg shadow-lg">
                <VehicleInfoCard />
              </div>
              <button 
                className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-md py-5 px-4 text-green-600 font-bold flex items-center justify-center transition-colors h-20 w-full text-lg"
                onClick={() => scrollToSection('inspection')}
              >
                <svg className="h-6 w-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Full Inspection Report
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content sections with 15% navigation and 75% content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Purchase Process section at the top */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Purchase Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="rounded-full bg-green-100 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Select Vehicle</h3>
              <p className="text-gray-600">Browse our inventory and choose your desired vehicle.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="rounded-full bg-green-100 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Inquire</h3>
              <p className="text-gray-600">Contact us for detailed information and pricing.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="rounded-full bg-green-100 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Documentation</h3>
              <p className="text-gray-600">We handle export paperwork and shipping arrangements.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="rounded-full bg-green-100 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Delivery</h3>
              <p className="text-gray-600">Vehicle is shipped to your preferred destination.</p>
            </div>
          </div>
        </div>
        
        {/* Detailed content with 15% sidebar + 75% content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12">
          {/* Navigation sidebar - 15% width (2/12 columns) */}
          <div className="lg:col-span-2">
            <SectionNavigation />
          </div>
          
          {/* Details content - 75% width (9/12 columns) */}
          <div className="lg:col-span-9">
          
            {/* Vehicle Details section */}
            <div ref={sectionRefs.details} id="details" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Vehicle Details</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{vehicle.description}</p>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Export Information</h3>
                <p className="text-gray-700">
                  This vehicle is ready for international export. We handle all documentation, customs procedures, and shipping arrangements.
                  Estimated delivery time is 3-6 weeks depending on destination.
                </p>
              </div>
            </div>
          
            {/* Vehicle Configuration section */}
            <div ref={sectionRefs.configuration} id="configuration" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Vehicle Configuration</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-500">Manufacturing Year</p>
                    <p className="font-medium text-gray-800">{vehicle.specs.year}</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-medium text-gray-800">{vehicle.specs.mileage}</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-500">Energy Type</p>
                    <p className="font-medium text-gray-800">{vehicle.specs.energyType}</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-medium text-gray-800">{vehicle.specs.transmission}</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="font-medium text-gray-800">{vehicle.specs.color}</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-500">Engine</p>
                    <p className="font-medium text-gray-800">{vehicle.specs.engine}</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="font-medium text-gray-800">{vehicle.specs.registration}</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-medium text-gray-800">{vehicle.specs.condition}</p>
                  </div>
                  <div className="col-span-1 md:col-span-2 border-b pb-4">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-800">{vehicle.specs.location}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vehicle.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Dent Map section */}
            <div ref={sectionRefs.dentMap} id="dentMap" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Dent Map</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="relative max-w-3xl mx-auto">
                  <img 
                    src={vehicle.image} 
                    alt="Vehicle Dent Map" 
                    className="w-full rounded-lg"
                  />
                  
                  {/* Sample dent indicators */}
                  <div className="absolute top-1/4 left-1/4 h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center -ml-3 -mt-3 cursor-pointer">
                    <span className="text-xs font-bold text-white">1</span>
                  </div>
                  
                  <div className="absolute top-1/2 right-1/3 h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center -ml-3 -mt-3 cursor-pointer">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <div className="h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs font-bold text-white">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Minor Scratch</h4>
                      <p className="text-sm text-gray-600">Front left door has a minor scratch approximately 5cm in length.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs font-bold text-white">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Small Dent</h4>
                      <p className="text-sm text-gray-600">Rear bumper has a small dent from a minor collision.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
            {/* Inspection Report section */}
            <div ref={sectionRefs.inspection} id="inspection" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Inspection Report</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">Overall Score</h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-green-600">{vehicle.inspectionScore}/100</span>
                    <span className="ml-2 text-sm text-gray-500">Excellent</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Exterior</span>
                      <span className="text-sm font-medium text-gray-700">92/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Interior</span>
                      <span className="text-sm font-medium text-gray-700">94/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Mechanical Condition</span>
                      <span className="text-sm font-medium text-gray-700">89/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Road Test Performance</span>
                      <span className="text-sm font-medium text-gray-700">95/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="text-green-600 hover:text-green-800 font-medium">
                    View Full Inspection Report
                  </button>
                </div>
              </div>
            </div>
            
            {/* Certification section */}
            {vehicle.certified && (
              <div ref={sectionRefs.certified} id="certification" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Certification</h2>
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center mb-4">
                    <svg className="h-8 w-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-green-800">Certified Pre-Owned</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    This is a fully certified pre-owned vehicle that has passed our rigorous 150-point inspection. Certified pre-owned vehicles come with additional warranty and support.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>12-month or 20,000 km extended warranty</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>24-hour roadside assistance</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>7-day or 1,000 km free exchange option</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* Recommended Vehicles section */}
            <div ref={sectionRefs.recommended} id="recommended" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Recommended Vehicles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample recommended vehicle cards with hover effects and clickable */}
                <Link to="/vehicle/1" className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2" 
                      alt="Tesla Model Y" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Price with green color */}
                    <p className="text-green-600 font-bold text-3xl mb-3">$174,888</p>
                    
                    {/* Vehicle name with "New" badge */}
                    <div className="flex items-center mb-4">
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded mr-2">New</span>
                      <h3 className="font-bold text-lg">Tesla Model Y 2021</h3>
                    </div>
                    
                    {/* Vehicle specs with icons */}
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        <span className="text-gray-700">Engine: 1490 cc</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        <span className="text-gray-700">Fuel efficiency: 28 km/L</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        <span className="text-gray-700">Power: 85 kW (114 bhp)</span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/vehicle/2" className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7" 
                      alt="BYD Tang EV" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Price with green color */}
                    <p className="text-green-600 font-bold text-3xl mb-3">$168,888</p>
                    
                    {/* Vehicle name with "New" badge */}
                    <div className="flex items-center mb-4">
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded mr-2">New</span>
                      <h3 className="font-bold text-lg">BYD Tang EV 2023</h3>
                    </div>
                    
                    {/* Vehicle specs with icons */}
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        <span className="text-gray-700">Engine: Electric</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        <span className="text-gray-700">Range: 400 km</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        <span className="text-gray-700">Power: 320 kW (429 bhp)</span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/vehicle/3" className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d" 
                      alt="Li Auto L9" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Price with green color */}
                    <p className="text-green-600 font-bold text-3xl mb-3">$188,888</p>
                    
                    {/* Vehicle name with "New" badge */}
                    <div className="flex items-center mb-4">
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded mr-2">New</span>
                      <h3 className="font-bold text-lg">Li Auto L9 2022</h3>
                    </div>
                    
                    {/* Vehicle specs with icons */}
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        <span className="text-gray-700">Engine: 1.5L Hybrid</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        <span className="text-gray-700">Fuel efficiency: 35 km/L</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        <span className="text-gray-700">Power: 330 kW (442 bhp)</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VehicleDetails;

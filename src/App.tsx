import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Hero } from './components/home/Hero';
import { FeaturedRestaurants } from './components/home/FeaturedRestaurants';
import { PopularCuisines } from './components/home/PopularCuisines';
import { UserProfile } from './pages/UserProfile';
import { UserDashboard } from './pages/UserDashboard';
import { RestaurantPage } from './pages/RestaurantPage';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { FirebaseTest } from './components/test/FirebaseTest';
import './styles/animations.css';

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedRestaurants />
      <PopularCuisines />
      <FirebaseTest />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
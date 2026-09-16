import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandIntro } from './components/BrandIntro';
import { BestSeller } from './components/BestSeller';
import { MenuSection } from './components/MenuSection';
import { PromoSection } from './components/PromoSection';
import { WhyKohTimo } from './components/WhyKohTimo';
import { HowToOrder } from './components/HowToOrder';
import { LocationSection } from './components/LocationSection';
import { ReviewCarousel } from './components/ReviewCarousel';
import { SocialSection } from './components/SocialSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MobileOrderBar } from './components/MobileOrderBar';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FFF7E8] text-[#241A14]">
        {/* Sticky Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. Brand Introduction */}
          <BrandIntro />

          {/* 3. Best Seller Section */}
          <BestSeller />

          {/* 4. Complete Menu Section with Interactive Filters & Search */}
          <MenuSection />

          {/* 5. Promotional Poster Section */}
          <PromoSection />

          {/* 6. Why Koh Timo Features */}
          <WhyKohTimo />

          {/* 7. How To Order Guide */}
          <HowToOrder />

          {/* 8. Outlets & Locations */}
          <LocationSection />

          {/* 9. Customer Reviews */}
          <ReviewCarousel />

          {/* 10. Social Media Grid */}
          <SocialSection />

          {/* 11. Frequently Asked Questions */}
          <FAQSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating & Modal Overlays */}
        <MobileOrderBar />
        <ProductModal />
        <CartDrawer />
        <Toast />
      </div>
    </CartProvider>
  );
}

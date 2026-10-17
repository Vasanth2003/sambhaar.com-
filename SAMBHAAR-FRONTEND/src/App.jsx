import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import WhatsappButton from "./components/WhatsappBtn";
import ScrollToTopButton from "./components/ScrolTopBtn";

function App() {
  const location = useLocation(); // Get the current route location
  const [showScroll, setShowScroll] = useState(false); // Track scroll visibility

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on every route change
  }, [location]);

  // Show Scroll-To-Top Button after scrolling down 200px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HelmetProvider>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 relative">
        <Navbar />
        <Outlet />
        {showScroll && <ScrollToTopButton />}
        <WhatsappButton />
      </div>
    </HelmetProvider>
  );
}

export default App;

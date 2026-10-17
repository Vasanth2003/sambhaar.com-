import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import CartModel from "./cart/CartModel";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";
import UpperSection from "./uppersection/UpperSection";
import Category4 from "../assets/icons/Fruits-&-Vegetables2.png";
import Category5 from "../assets/icons/All.png";
import Category6 from "../assets/icons/Healthcare & Personal Care.png";
import Category7 from "../assets/icons/Cleaning-&-Household2.png";
import Category8 from "../assets/icons/Pooja-Essentials2.png";
import Category9 from "../assets/icons/Stationery2.png";

function Navbar() {
  const { totalPrice } = useSelector((store) => store.cart);
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };
  const [showDropdown, setShowDropdown] = useState(false);
const upperSections = [
    {
      name: "All",
      path: "Health & Personal Care",
      image: Category5,
      idd: "674714906d3bc0eb4161e61a",
      pathUrl: "/",
    },
    {
      name: "Farm Fresh",
      path: "Pooja Essentials",
      image: Category4,
      idd: "67497e06ef6a9102d46d8667",
    },
    {
      name: "Personal Care",
      path: "Health & Personal Care",
      image: Category6,
      idd: "674714906d3bc0eb4161e61a",
    },
    {
      name: "House Keeping",
      path: "Cleaning & Household",
      image: Category7,
      idd: "674714bb6d3bc0eb4161e630",
    },
    {
      name: "Pooja",
      path: "Pooja Essentials",
      image: Category8,
      idd: "67497e06ef6a9102d46d8667",
    },
    {
      name: "Stationery",
      path: "Stationery & Fancy Items",
      image: Category9,
      idd: "67497f1aef6a9102d46d870e",
    },
  ];

    const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null); // Ref for dropdown
  const mobileMenuRef = useRef(null); // Ref for mobile menu

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false); // Close mobile menu
      }
    };
  
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect click outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownOpen(false); // Close dropdown
      }
    };

    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen]);

  // Admin dropdown menus
  const adminDropDownMenus = [
    { path: "/dashboard/admin", label: "Dashboard" },
    { path: "/dashboard/profile", label: "My Profile" },
    { path: "/dashboard/orders", label: "My orders" },
    { path: "/dashboard/users", label: "Users" },
    { path: "/dashboard/manage-categories", label: "Categories" },
    { path: "/dashboard/manage-products", label: "Products" },
    { path: "/dashboard/manage-blogs", label: "Blogs" },
    { path: "/dashboard/manage-milks", label: "Milks" },
    { path: "/dashboard/manage-orders", label: "Orders" },
  ];

  // User dropdown menus
  const userDropDownMenus = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/dashboard/orders", label: "My orders" },
    { path: "/dashboard/profile", label: "Profile" },
    { path: "/order-summary", label: "Checkout" },
    { path: "/dashboard/reviews", label: "Reviews" },
  ];

  const dropDownMenus =
    user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-orange-400 h-8 w-full fixed top-0 z-50 overflow-hidden">
        <div className="marquee-wrapper flex items-center text-white font-medium text-sm py-1">
          <div className="marquee animate-marquee">
           <div className="marquee-content">
            {/* First set */}
            <div>Get an Extra 10% Off* on Your 1st Order 🤯</div>
            <div>FREE* Shipping on All Orders – Buy Now 🚚</div>
            <div>Enjoy Same-Day Delivery* across Thoraipakkam! ❤️</div>

            {/* Duplicate set */}
            <div>Get an Extra 10% Off* on Your 1st Order 🤯</div>
            <div>FREE* Shipping on All Orders – Buy Now 🚚</div>
            <div>Enjoy Same-Day Delivery* across Thoraipakkam! ❤️</div>
          </div>
            
          </div>
        </div>
      </section>

      <header
        className={`fixed top-8 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md text-gray-700 "
            : "bg-transparent text-white"
        }`}
      >
        <nav className="flex items-center justify-between  px-0 py-4 md:px-3 md:py-3 max-w-full">
  <div className="flex items-center pl-0 lg:pl-16">
        <Link to="/">
              <img src="/sambhaar.png" alt="Logo" className="  lg:h-14 md:h-22 sm:h-18  " />
            </Link>
          </div>

          <div className="flex items-center justify-between space-x-6">
          
          <span>
          
              {/* <div className="hidden sm:block">
        <div className="relative group transition-all duration-300 ease-in-out">
          <Link to="/search">
            <div
              className="w-full px-12 py-3 rounded-full shadow-md bg-primary text-white placeholder-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary hover:placeholder-black hover:shadow-lg hover:bg-white  hover:text-primary cursor-pointer"
            >
              Search products here...
            </div>
            <i className="ri-search-line ri-lg absolute left-4 top-1/2 transform -translate-y-1/2 text-white group-hover:text-primary transition-all duration-300 ease-in-out" />
          </Link>
        </div>
      </div> */}

      <div className="hidden sm:block ">
        <div className="relative group transition-all duration-300 ease-in-out ">
          <Link to="/search">
           <div
  className="relative  w-full px-12 py-2 rounded-lg border-primary border-2 text-primary text-base font-medium
             cursor-pointer overflow-hidden 
             before:absolute before:inset-0 before:bg-gradient-to-r
             before:from-transparent before:via-primary/40 before:to-transparent 
             before:animate-aluminum before:z-10
             shadow-inner"
>
  <span className="relative z-20">Search <span className="hidden xl:inline-block  "> Products Here...</span></span>
</div>
            <i className="ri-search-line ri-lg absolute left-4 top-1/2 transform -translate-y-1/2 text-primary group-hover:text-primary transition-all duration-300 ease-in-out" />
          </Link>
        </div>
      </div>

                </span>


                
 <div className="hidden md:flex space-x-6 text-gray-700">
            {/*            
              <Link to="/shop" className="hover:text-primary hover:font-medium">
                Products
              </Link>

              
              <Link
                to="/about"
                className="hover:text-primary hover:font-medium"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="hover:text-primary hover:font-medium"
              >
                Contact
               */}


             <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      // onMouseLeave={() => setOpen(false)}
    >
      {/* Products */}
      <Link
        to="/shop"
        className="hover:text-primary hover:font-medium "
      >
        Products
      </Link>

      {/* Dropdown */}
      {open && (
        <div className="absolute -left-10 top-10 mt-2 w-64 bg-white shadow-lg rounded-lg z-50 py-2"
        onMouseLeave={() => setOpen(false)}

        >
          
          {upperSections.map((item, index) => (
            <Link
              key={index}
              to={
                item.pathUrl
                  ? item.pathUrl
                  : `/homecategoryproducts/${item.idd}`
              }
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-6 h-6"
              />
              <span className="text-sm text-gray-700">
                {item.name}
              </span>
            </Link>
          ))}

        </div>
      )}
      
            </div>
    </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-4 items-center">
                

                <span>
                  {user ? (
                    <>
                      {user.profileImage ? (
                        <img
                          onClick={handleDropDownToggle}
                          src={user.profileImage}
                          alt="User Avatar"
                          className="size-10 rounded-full cursor-pointer"
                        />
                      ) : (
                        <button
                          onClick={handleDropDownToggle}
                          className="bg-gray-200 text-primary hover:text-primary-dark hover:bg-gray-300 p-2 rounded-full"
                        >
                          <i className="ri-user-line ri-lg"></i>
                        </button>
                      )}

                      {isDropDownOpen && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-10 mt-1 p-4 w-48 bg-white border border-gray-200 rounded-md shadow-2xl z-50"
                        >
                          <ul className="font-medium space-y-4 p-2">
                            {dropDownMenus.map((menu, index) => (
                              <li key={index}>
                                <button
                                  onClick={() => {
                                    setIsDropDownOpen(false);
                                    navigate(menu.path);
                                  }}
                                  className="dropdown-items text-gray-700 hover:text-primary"
                                >
                                  {menu.label}
                                </button>
                              </li>
                            ))}
                            <li>
                              <button
                                onClick={handleLogout}
                                className="dropdown-items text-gray-700 hover:text-primary"
                              >
                                Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-primary hover:bg-primary-dark rounded-md px-4 py-2 text-primary-light hover:text-white font-normal"
                    >
                      Login
                    </button>
                  )}
                </span>
              </div>
   <div><span>
                    <Link
                      to="/search"
                      className="text-gray-700 hover:text-[#C74227] transition-all duration-200"
                    >
                      <i className="ri-search-line ri-lg lg:hidden"></i>
                    </Link>
                  </span>
                  </div>
              <button
                className="md:hidden flex items-center pr-10 md:pr-0 lg:pr-0 text-primary  focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <svg
                  className="w-6 h-6 transition-transform transform-gpu duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                
              </button>

              

                
            </div>
            
           
            {/* Mobile Menu - Visible when toggled */}
            {isMobileMenuOpen && (
              <div ref={mobileMenuRef} className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden transition-all duration-300 ease-in-out z-50 transform scale-95 opacity-0 animate-fadeIn">
                <Link
                  to="/shop"
                  className="text-gray-700 hover:text-[#C74227] transition duration-200 hover:font-medium"
                >
                  Products
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-[#C74227] transition duration-200 hover:font-medium"
                >
                  Contact
                </Link>
                <div className="flex items-center space-x-4 mt-2">
               
                  <span>
                    <button
                      onClick={handleCartToggle}
                      className="relative text-gray-700 hover:text-[#C74227] transition-all duration-200"
                    >
                      <i className="ri-shopping-cart-line ri-lg"></i>
                      <sup className="absolute -top-2 -right-2 text-xs px-1.5 text-white bg-primary rounded-full">
                        {products.length}
                      </sup>
                    </button>
                  </span>
                  <span>
                    {user && user ? (
                      <>
                        {user.profileImage ? (
                          <img
                            onClick={handleDropDownToggle}
                            src={user.profileImage}
                            alt="User Avatar"
                            className="size-7 rounded-full cursor-pointer"
                          />
                        ) : (
                          <Link
                            onClick={handleDropDownToggle}
                            className="bg-gray-200 text-primary hover:text-primary-dark hover:bg-gray-300 p-2 rounded-full"
                          >
                            <i className="ri-user-line ri-lg"></i>
                          </Link>
                        )}
                        {isDropDownOpen && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-10 mt-1 p-4 w-48 bg-white border border-gray-200 rounded-md shadow-2xl z-50"
                          >
                            <ul className="font-medium space-y-4 p-2">
                              {dropDownMenus.map((menu, index) => (
                                <li key={index}>
                                  <Link
                                    onClick={() => {
                                      setIsDropDownOpen(false);
                                      navigate(menu.path);
                                    }}
                                    className="dropdown-items text-gray-700 hover:text-primary"
                                    to={menu.path}
                                  >
                                    {menu.label}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  onClick={handleLogout}
                                  className="dropdown-items text-gray-700 hover:text-primary"
                                >
                                  Logout
                                </Link>
                              </li>
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => navigate("/login")}
                        className="bg-primary hover:bg-primary-dark rounded-md px-4 py-2 text-primary-light hover:text-white font-normal"
                      >
                        Login
                      </button>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </nav>
      {/* {(location.pathname === "/" ||
  location.pathname.startsWith("/homecategoryproducts")) && (
  <>
    <div className="h-[1px] bg-gray-400"></div>
    <UpperSection />
    <div className="h-[3px] bg-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.2)]"></div>

  
  </>


)} */}

<div className="h-[1px] bg-gray-400"></div>
    {/* <UpperSection /> */}
    <div className="h-[3px] bg-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.2)]"></div>

        {isCartOpen && (
          <CartModel
            products={products}
            isOpen={isCartOpen}
            onClose={handleCartToggle}
          />
        )}

        {/* Add to card */}
       <div
        onClick={handleCartToggle}
        className="top-[80%] md:top-[50%] -right-1 z-50 fixed flex items-center justify-end cursor-pointer"
      >
        <span className="bg-gradient-to-br from-orange-600 to-orange-400 px-3 py-4 rounded-md gap-2 flex flex-col">
          <div>
            <i className="ri-shopping-cart-fill ri-lg text-white"></i>
            <span className="inline-block text-sm pl-0.5 font-semibold text-white">
              {products.length} {products.length > 1 ? "Items" : "Item"}
            </span>
          </div>
          <p className="bg-white text-sm font-medium px-1 py-2 flex justify-center rounded-sm text-primary">
            ₹{totalPrice}
          </p>
        </span>
      </div>

      </header>
    </div>
  );
}

export default Navbar;


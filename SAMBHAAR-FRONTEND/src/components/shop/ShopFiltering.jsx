import { useState, useEffect, useRef } from "react";

const ShopFiltering = ({
  filtersState,
  setFiltersState,
  clearFilters,
  filters,
  bestSellingOpen,
  setBestSellingOpen,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleCategorySelect = (category) => {
    setBestSellingOpen(false);
    setFiltersState({ ...filtersState, category, subcategory: "" });
    setExpandedCategory(expandedCategory === category ? null : category);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategory) => {
    console.log(subcategory);
    
    setFiltersState({ ...filtersState, subcategory });
    setSelectedSubcategory(subcategory);
  };

  useEffect(()=>{
    const handlingError=()=>{
      if(expandedCategory===null)
        setBestSellingOpen(true)

    }
    handlingError()
  },[expandedCategory])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className="sm:hidden flex justify-between items-center px-6 py-3">
        <button className="text-xl" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <i className="ri-menu-4-line"></i>
        </button>
      </div>
      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-50 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:block w-64 sm:hidden`}
      >
        <div className="space-y-6 py-8 w-64">
          <div className="flex flex-col space-y-6 px-10">
            {/* ✅ Best Selling Button */}
            <div
              className={`flex flex-col mb-4 cursor-pointer ${
                bestSellingOpen ? "text-primary" : "text-black"
              }`}
              onClick={() => {
                setBestSellingOpen(true);
                setExpandedCategory(null);
                setSelectedSubcategory(null);
                setFiltersState({ ...filtersState, category: "", subcategory: "" });
              }}
            >
              <span className="text-md font-medium">Best Selling</span>
            </div>

            {/* Category Accordion */}
            {filters.categories.map((category) => (
              <div key={category.value} className="mb-2">
                <div
                  className={`flex justify-between items-center cursor-pointer rounded-md ${
                    expandedCategory === category.value && selectedSubcategory === null && !bestSellingOpen
                      ? "text-primary"
                      : "text-heading"
                  }`}
                  onClick={() => handleCategorySelect(category.value)
                  }
                >
                  <div className="flex items-center gap-2">
                    {category.icon && <i className={category.icon}></i>}
                    <span className="text-sm font-medium">{category.label}</span>
                  </div>
                  {category.subcategories?.length > 0 && (
                    <button
                      className={`transition-transform duration-300 ${
                        expandedCategory === category.value ? "rotate-180" : ""
                      }`}
                    >
                      <i className="ri-arrow-down-s-line text-xl"></i>
                    </button>
                  )}
                </div>

                {/* Subcategories Accordion */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedCategory === category.value ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {category.subcategories?.map((subcategory) => (
                    <div
                      key={subcategory.value}
                      className={`py-3 pr-2 pl-8 flex rounded-md cursor-pointer text-sm font-medium ${
                        selectedSubcategory === subcategory.value ? "text-primary" : "text-heading"
                      }`}
                      onClick={() => handleSubcategorySelect(subcategory.value)}
                    >
                      {subcategory.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Clear Filters */}
          <div className="w-full flex justify-center text-center">
            <button
              onClick={() => {
                clearFilters();
                setSelectedSubcategory(null);
                setExpandedCategory(null);
                setBestSellingOpen(false);

              }}
              className="border-primary text-sm mt-2 mb-20 border p-2 rounded-md text-primary"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden sm:block space-y-6 py-8  h-screen w-64">
        <div className="flex flex-col space-y-6 px-8 mt-5">
          {filters.categories.map((category) => (
            <div key={category.value} className="mb-2">
              <div
                className={`flex justify-between items-center cursor-pointer rounded-md ${
                  expandedCategory === category.value && selectedSubcategory === null && !bestSellingOpen
                    ? "text-primary"
                    : "text-heading"
                }`}
                onClick={() => handleCategorySelect(category.value)}
              >
                <div className="flex items-center gap-2">
                  {category.icon && <i className={category.icon}></i>}
                  <span className="text-sm font-medium">{category.label}</span>
                </div>
                {category.subcategories?.length > 0 && (
                  <button
                    className={`transition-transform duration-300 ${
                      expandedCategory === category.value ? "rotate-180" : ""
                    }`}
                  >
                    <i className="ri-arrow-down-s-line text-xl"></i>
                  </button>
                )}
              </div>

              {/* Subcategories Accordion */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedCategory === category.value ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {category.subcategories?.map((subcategory) => (
                  <div
                    key={subcategory.value}
                    className={`py-3 pr-2 pl-8 flex rounded-md cursor-pointer text-sm font-medium ${
                      selectedSubcategory === subcategory.value ? "text-primary" : "text-heading"
                    }`}
                    onClick={() => handleSubcategorySelect(subcategory.value)}
                  >
                    {subcategory.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Clear Filters */}
        <div className="w-full flex justify-center text-center">
          <button
            onClick={() => {
              clearFilters();
              setSelectedSubcategory(null);
              setExpandedCategory(null);
              setBestSellingOpen(false);
            }}
            className="border-primary text-sm mt-2 border p-2 rounded-md text-primary"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default ShopFiltering;

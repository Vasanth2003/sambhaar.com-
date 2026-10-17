


import { useState } from "react";
import ProductCards from "./ProductCards";
import { useFetchBestSellerProductsQuery } from "../../redux/features/products/productsApi";

const BestSelling = () => {
  const { data, isLoading, error } = useFetchBestSellerProductsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // You can adjust this

  if (isLoading)
    return <p className="text-center py-10">Loading best selling products...</p>;
  if (error)
    return <p className="text-center py-10">Error loading best selling products.</p>;
  if (!data || data?.bestseller.length === 0)
    return <p className="text-center py-10">No best-selling products found.</p>;

  // Pagination logic
  const totalProducts = data.bestseller.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = data.bestseller.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="p-4">
      <ProductCards products={currentProducts} />

      {/* Pagination UI */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-4 py-1 rounded-md ring-1 ring-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-primary text-lg">{currentPage}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-4 py-1 rounded-md ring-1 ring-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BestSelling;

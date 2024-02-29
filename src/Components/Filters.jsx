import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../SideBarWithPagination/Sidebar";
import Pagination from "../SideBarWithPagination/Pagination";

const Filters = () => {
  const { id } = useParams();
  const productsPerPage = 20;
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/filter`);
        const { category, age, holiday, skill_development, companies } =
          response.data;

        // Do whatever you need to do with the fetched data
        console.log(category);
        console.log(age);
        console.log(holiday);
        console.log(skill_development);
        console.log(companies);

        // Update the state accordingly
        setFilters(response.data.toys);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Check if filters array is defined before accessing its length property
  const totalPages = filters ? Math.ceil(filters.length / productsPerPage) : 0;

  const renderPagination = () => {
    // Conditionally render pagination only when there is more than one page
    if (totalPages > 1) {
      return (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      );
    }
    return null; // Don't render pagination if there's only one page or filters are not yet loaded
  };

  // Slice the current filters based on pagination
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const currentFilters = filters ? filters.slice(startIdx, endIdx) : [];

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 h-screen">
        <div className="text-center mb-4">
          <h1 className="text-3xl pt-4 font-medium text-blue-500">
            Results of Filters you choices.{" "}
          </h1>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {currentFilters.map((toy) => (
              <div key={toy.id} className="product-container">
                <div className="relative overflow-hidden">
                  <img
                    src={toy.image}
                    alt={toy.name}
                    className="mb-2 transition-transform duration-300 transform hover:scale-110"
                  />
                </div>
                <h3 className="font-semibold">{toy.name}</h3>
                <p className="text-gray-600">{toy.price}</p>
                <Link to={`/products/${toy.id}`}>
                  <button className="bg-blue-500 text-white py-1 px-2 rounded mt-2">
                    Show Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Filters;

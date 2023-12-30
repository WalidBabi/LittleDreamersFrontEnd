import React, { useState } from "react";
import aboutUss from "../images/aboutUss.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [filters, setFilters] = useState({
    Age: false,
    Price: false,
    Category: false,
    Brand: false,
    DevelopmentalBenefits: false,
    SocialEvents: false,
  });

  const toggleFilter = (filter) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  const filterOptions = {
    Age: ["0-2 years", "3-5 years", "6-8 years", "9-12 years"],
    Price: ["Under $10", "$10 - $20", "$20 - $50", "Over $50"],
    Category: ["Toys", "Books", "Games", "Electronics"],
    Brand: ["Brand A", "Brand B", "Brand C", "Brand D"],
    DevelopmentalBenefits: ["Cognitive", "Motor Skills", "Creativity"],
    SocialEvents: ["Party", "Outdoor", "Indoor", "Educational"],
  };

  const products = [
    {
      id: 1,
      name: "Product 1",
      imageUrl: aboutUss,
      price: "$20",
    },
    {
      id: 2,
      name: "Product 2",
      imageUrl: aboutUss,
      price: "$25",
    },
    {
      id: 3,
      name: "Product 3",
      imageUrl: aboutUss,
      price: "$15",
    },
    {
      id: 4,
      name: "Product 4",
      imageUrl: aboutUss,
      price: "$30",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-200 p-4 h-screen">
        <h2 className="text-lg font-semibold mb-4">Category Filters</h2>
        <div className="space-y-2">
          {Object.keys(filters).map((filterKey) => (
            <div key={filterKey}>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleFilter(filterKey)}
              >
                <h3 className="text-sm font-semibold">{filterKey}</h3>
                <svg
                  className={`h-4 w-4 transform ${
                    filters[filterKey] ? "rotate-90" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {filters[filterKey] && (
                <div className="ml-4">
                  {filterOptions[filterKey].map((option) => (
                    <label key={option} className="flex items-center mb-1">
                      <input type="checkbox" className="mr-2" />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Product Display */}
      <div className="w-4/5 p-4">
        {/* <h2 className="text-center text-4xl font-bold mb-8">Suggested For You</h2> */}
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mb-2 transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <Link to={`/product/${product.id}`}>
                <button className="bg-blue-500 text-white py-1 px-2 rounded mt-2">
                  Show Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

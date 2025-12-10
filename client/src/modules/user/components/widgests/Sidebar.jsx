// import React, { useState } from "react";

// // Sample filter options
// const categories = [
//   "All",
//   "Barber Razor",
//   "Location Pin",
//   "Barber Shave",
//   "Barber Seat",
//   "Hair Dryer",
//   "Barber Spray",
// ];

// function Sidebar({ onFilter }) {
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const handleFilterChange = (category) => {
//     setSelectedCategory(category);
//     onFilter(category);
//   };

//   return (
//     <div className="sidebar">
//       <h3 className="mb-4">Filter by Category</h3>
//       <ul className="list-unstyled">
//         {categories.map((category) => (
//           <li key={category} className="mb-2">
//             <button
//               className={`btn btn-outline-primary ${
//                 selectedCategory === category ? "active" : ""
//               }`}
//               onClick={() => handleFilterChange(category)}
//             >
//               {category}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

import React from 'react';
import PropTypes from 'prop-types';

function Sidebar({ categories = [], onFilter }) {
  // Check if categories is defined and is an array
  if (!Array.isArray(categories)) {
    return <div>No categories available</div>;
  }

  return (
    <div>
      <h2>Filter by Category</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => onFilter(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  onFilter: PropTypes.func.isRequired,
};

export default Sidebar;

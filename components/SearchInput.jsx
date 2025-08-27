// components/SearchInput.jsx
import { FaChevronDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  return (
    <div className="relative group flex items-center border bg-gray-100 border-gray-300 hover:border-blue-500 rounded-md px-3 py-1.5 w-fit transition-all duration-150 ease-in-out">
      {/* Icon group */}
      <div className="flex items-center space-x-2 text-gray-400">
        <div className="flex">
          <CiSearch size={20} color="black" />
          <FaChevronDown className="text-blue-500 pt-1" />
        </div>
        <div className="w-px h-5 bg-gray-300 mx-2" /> {/* Divider */}
      </div>

      {/* Input field */}
      <input
        type="text"
        placeholder="Search in Customers ( / )"
        className="pl-1 pr-4 w-auto group-hover:w-55 focus:w-65 transition-all duration-300 ease-in-out outline-none bg-transparent"
      />
    </div>
  );
};

export default SearchInput;

"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

// Props
interface SearchBarProps {
  filterResults: (keyword: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  filterResults,
  placeholder,
}) => {
  return (
    <div className="text-right my-3 relative h-12">
      <div className=" w-[30rem] float-right">
        <label className="sr-only">Search</label>
        <input
          className="border-2 border-stone-300 w-full rounded-xl relative p-2 pr-10  mx-auto"
          type="text"
          placeholder={placeholder}
          onChange={(e) => filterResults(e.currentTarget.value)}
        />
        <button className="align-middle absolute right-2 top-2">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

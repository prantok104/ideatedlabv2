"use client"

import { useState } from "react";
import SearchableList from "./_components/SearchableList";
import SearchFilter from "./_components/SearchFilter";

const SearchLoadPage  = () => {
   const [searchData, setSearchData] = useState([]);
   return <div className="grid">
      <div className="cols-12">
         <SearchFilter setSearchData={setSearchData} />
      </div>

      <div className="cols-12 mt-6 overflow-auto">
         <SearchableList searchData={searchData} />
      </div>
   </div>;
}
export default SearchLoadPage;
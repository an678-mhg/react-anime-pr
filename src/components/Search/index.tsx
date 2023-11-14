import React from "react";
import Logo from "../Layout/Header/Logo";
import SearchForm from "./SearchForm";

const Search = () => {
  return (
    <div>
      <div>
        <div className="container flex justify-center flex-col items-center">
          <Logo className="text-[100px]" />
          <h1 className="text-xl font-semibold mt-8 text-center">
            React Anime - Just a better place for watch anime online free!
          </h1>
        </div>

        <SearchForm />
      </div>
    </div>
  );
};

export default Search;

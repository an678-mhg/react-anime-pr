"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

const SearchForm = () => {
  const [q, setQ] = useState("");
  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e?.target?.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!q?.trim()) return;
    router?.push(`/results?q=${q}`);
  };

  return (
    <form onSubmit={handleSearch} className="mt-8 text-center container">
      <div>
        <input
          value={q}
          onChange={handleOnChange}
          placeholder="Enter anime name...."
          className="md:w-[600px] w-full p-4 outline-none rounded-md border border-red-500 bg-transparent"
        />
      </div>
      <button className="font-normal md:w-auto w-full justify-center px-8 py-2 bg-red-500 inline-flex mt-8 rounded-md">
        Search
      </button>
    </form>
  );
};

export default SearchForm;

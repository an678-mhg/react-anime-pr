"use client";

import { filterAnime } from "@/services/anime";
import { Category2, Country2 } from "@/types/utils";
import { notFound, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Select, { MultiValue } from "react-select";
import InfinityLoading from "./InfinityLoading";

interface BrowseFilterProps {
  categories: Category2[];
  countries: Country2[];
}

const BrowseFilter: React.FC<BrowseFilterProps> = ({
  categories,
  countries,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [value, setValue] = useState<{
    categories: { value: string; label: string }[];
    countries: { value: string; label: string }[];
  }>({
    categories: [],
    countries: [],
  });

  const customStyles = {
    // @ts-ignore
    control: (base, state) => ({
      ...base,
      background: "#222",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
    }),
    // @ts-ignore
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    // @ts-ignore
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
    // @ts-ignore
    option: (base) => ({
      ...base,
      background: "#222",
    }),
    // @ts-ignore
    multiValue: (base) => ({
      ...base,
      background: "#333",
    }),
    // @ts-ignore
    multiValueLabel: (base) => ({
      ...base,
      color: "#fff",
    }),
  };

  const handleOnChangeCategory = (
    newValue: MultiValue<{
      value: number;
      label: string;
    }>
  ) => {
    // @ts-ignore
    setValue((prev) => ({
      ...prev,
      categories: [...newValue],
    }));
  };

  const handleOnChangeCountry = (
    newValue: MultiValue<{
      value: number;
      label: string;
    }>
  ) => {
    // @ts-ignore
    setValue((prev) => ({
      ...prev,
      countries: [...newValue],
    }));
  };

  useEffect(() => {
    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (value?.categories?.length === 0 && value?.countries?.length === 0)
      return;

    router?.push(
      `/browse?categories=${value?.categories?.map(
        (item) => item.value
      )}&countries=${value?.countries?.map((item) => item.value)}`
    );
  }, [value?.categories, value?.countries, router, categories]);

  useEffect(() => {
    if (searchParams?.get("categories")) {
      const categoriesSearchParams = searchParams
        ?.get("categories")
        ?.split(",")
        ?.map((item) => ({
          value: item,
          label: categories?.find((c) => c.id.toString() === item)?.name,
        }));

      // @ts-ignore
      setValue((prev) => ({
        ...prev,
        categories: categoriesSearchParams,
      }));
    }

    if (searchParams?.get("countries")) {
      const countriesSearchParams = searchParams
        ?.get("countries")
        ?.split(",")
        ?.map((item) => ({
          value: item,
          label: countries?.find((c) => c.id.toString() === item)?.name,
        }));

      // @ts-ignore
      setValue((prev) => ({
        ...prev,
        countries: countriesSearchParams,
      }));
    }
  }, [categories, countries, searchParams]);

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery(
    [`filter-${JSON.stringify(value)}`],
    (pageParams) =>
      filterAnime({
        limit: "20",
        page: pageParams?.pageParam?.toString() || "1",
        category_id: value?.categories?.map((item) => `${item.value}`),
        country_id: value?.countries?.map((item) => `${item?.value}`),
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage?.pagination?.has_next_page
          ? lastPage?.pagination?.page_current + 1
          : null,
    }
  );

  if (isError) return notFound();

  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 py-5 bg-[#161616] sticky top-[56px] w-full z-[99] gap-4 grid-cols-1">
        <Select
          // @ts-ignore
          options={categories?.map((item) => ({
            value: item?.id,
            label: item?.name,
          }))}
          styles={customStyles}
          placeholder="Select Genres"
          isMulti
          // @ts-ignore
          onChange={handleOnChangeCategory}
          value={value?.categories}
        />
        <Select
          // @ts-ignore
          options={countries?.map((item) => ({
            value: item?.id,
            label: item?.name,
          }))}
          styles={customStyles}
          placeholder="Select Countries"
          isMulti
          // @ts-ignore
          onChange={handleOnChangeCountry}
          value={value?.countries}
        />
      </div>

      <InfinityLoading
        isLoading={isLoading}
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage!}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default BrowseFilter;

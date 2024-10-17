"use client";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

function NavSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(
    searchParams?.get("search")?.toString() || ""
  );

  //useDebouncedCallback to delay the search
  const handleSearch = useDebouncedCallback((value: string) => {
    // search logic
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    // console.log(params);

    router.replace(`/products?${params.toString()}`);
  }, 300);

  //useEffect to set search back to ""
  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams.get("search")]);

  return (
    <Input
      type="search"
      placeholder="search product..."
      className="max-w-xs dark:bg-muted"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
}

export default NavSearch;

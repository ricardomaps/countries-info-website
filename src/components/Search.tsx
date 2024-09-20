"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default function Search() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handleSearch = useDebouncedCallback((country) => {
    const newParams = new URLSearchParams(params);
    if(country) {
      newParams.set("name", country);
    } else {
      newParams.delete("name");
    }
    router.replace(`${pathname}?${newParams.toString()}`);
  }, 300);
  return (
    <div className="bg-skin-card text-skin-muted py-4 px-8 w-[32rem] rounded-md shadow-md">
      <FontAwesomeIcon icon={faSearch} className="mr-6"/>
      <input 
        className="inline outline-none"
        onChange={(e) => handleSearch(e.target.value)} 
        defaultValue={params.get("name")?.toString()} 
        type="text" 
        placeholder="Search for a country..."/>
    </div>
  );
  
}

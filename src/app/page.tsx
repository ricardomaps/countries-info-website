import Image from "next/image";
import CountryCard from "@/components/CountryCard.tsx";
import Search from "@/components/Search.tsx";
import Filter from "@/components/Filter.tsx";

async function getCountries(params) {
  const { name = "", region = "" } = params;
  const res = await fetch(`http://localhost:8000/countries?name_like=${name}&region_like=${region}`);
  const data = await res.json();
  return data;
}

export default async function Home({ searchParams }) {
  const countries = await getCountries(searchParams);
  return (
    <div className="px-20">
      <div className="flex justify-between py-12">
        <Search/>
        <Filter/>
      </div>

      <div className="grid grid-cols-4 gap-20 auto-rows-fr pb-20">
        {countries.map((country, key) => (
          <div key={key}>
            <CountryCard {...country}/>
          </div>))}
      </div>
    </div>
  );
}

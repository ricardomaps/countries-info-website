import Image from "next/image";
import CountryCard from "../components/CountryCard.tsx";

async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags");
  const data = await res.json();
  return data;
}

      // <div className="flex justify-between mb-20">
      //   <input>
      //   <select>
      // </div>

export default async function Home() {
  const countries = await getCountries();
  return (
    <div className="bg-skin-fill ">
      <div className="px-20 grid grid-cols-4 gap-20 auto-rows-fr">
        {countries.map((country, key) => (
          <div key={key}>
            <CountryCard {...country}/>
          </div>))}
      </div>
    </div>
  );
}

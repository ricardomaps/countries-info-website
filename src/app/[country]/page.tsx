import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/BackButton.tsx";

export async function generateStaticParams() {
    const res = await fetch("http://localhost:8000/countries")  
    const data = await res.json();
    return data.map(country => {country: country.name});
}

async function getCountryDetails(name) {
  const res = await fetch(`http://localhost:8000/countries?name=${name}`);
  const data = await res.json();
  const bordersRes = await Promise.all(data[0].borders?.map(cc =>
    fetch(`http://localhost:8000/countries?alpha3Code=${cc}`)) ?? []);
  const bordersData = await Promise.all(bordersRes.map(res => res.json()));
  const bordered = bordersData.flat();
  return {...data[0], bordered};
}

export default async function CountryDetail({ params }) {
    const country = await getCountryDetails(params.country);
    const nativeName = country.nativeName;
    const languages = country.languages.map(lang => lang.name).join(", ");
    const currencies = Object.values(country.currencies).map(curr => curr.name).join(", ");
    const topLevelDomain = country.topLevelDomain;
    const capitals = country.capital;
    const subregion = country.subregion;
    const bordered = country.bordered.map(b => b.name);

    return (
      <div className="px-28">
        <div className="py-12">
          <BackButton/>
        </div>
        <div className="flex gap-16">
          <Image alt={`${country.name}'s flag`} src={country.flags.svg} width={500} height={400} className="block w-[32rem] h-[20rem]"/>
          <div className="h-full flex flex-col justify-between">
            <h2 className="text-3xl font-bold text-skin-base mb-4">{country.name}</h2>
            <div className="flex gap-24 mb-10">
              <div>
                <p className="text-skin-base">Native Name: <span className="text-skin-muted"> {nativeName} </span> </p>
                <p className="text-skin-base">Population: <span className="text-skin-muted"> {country.population} </span> </p>
                <p className="text-skin-base">Region: <span className="text-skin-muted"> {country.region} </span> </p>
                 {!!subregion && <p className="text-skin-base">Sub Region: <span className="text-skin-muted">{subregion} </span> </p>} 
                <p className="text-skin-base">Capital: <span className="text-skin-muted"> {capitals} </span> </p>
              </div>
              <div>
                <p className="text-skin-base">Top Level Domain:<span className="text-skin-muted"> {topLevelDomain} </span></p>
                <p className="text-skin-base">Currencies:<span className="text-skin-muted"> {currencies} </span></p>
                <p className="text-skin-base">Languages:<span className="text-skin-muted"> {languages} </span></p>
              </div>
            </div>
            <div>
            {bordered.length > 0 &&
              <p className="text-skin-base">
              Border Countries:
              {bordered.map((border, index) => 
                <Link href={border} key={index} className="bg-skin-card text-skin-muted inline-block px-6 py-1 first:ml-4 mr-3 mb-3 rounded-sm shadow-md">{border}</Link>)}
              </p>}
            </div>
          </div>
        </div>
      </div>
    );
}

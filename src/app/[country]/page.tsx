import Link from "next/link";
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
      <div className="w-screen h-screen bg-skin-fill px-16">
        <div className="py-12">
          <BackButton/>
        </div>
        <div className="flex gap-16">
          <img alt={`${country.name}'s flag`} src={country.flags.png} className="block w-[32rem] h-[20rem]"/>
          <div>
            <h2 className="text-lg font-bold text-skin-base">{country.name}</h2>
            <div className="flex gap-8 align-center">
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
            {bordered.length > 0 &&
              <p className="text-skin-base">
              Border Countries:
              {bordered.map(border => 
                <Link href={border} className="bg-skin-card text-skin-muted inline-block px-6 py-1 first:ml-4 mr-3 rounded-sm shadow-md">{border}</Link>)}
              </p>}
          </div>
        </div>
      </div>
    );
}

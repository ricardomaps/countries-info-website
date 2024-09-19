import Link from "next/link";

export async function generateStaticParams() {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags")  
    const data = await res.json();
    return data.map(name => {country: name.common});
}

async function getCountryDetails(name) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await res.json();
  const bordersRes = await Promise.all(data[0].borders?.map(cc =>
    fetch(`https://restcountries.com/v3.1/alpha/${cc}?fields=name`)) ?? []);
  const borderedCountries = await Promise.all(bordersRes.map(res => res.json()));
  return {...data[0], borderedCountries};
}

export default async function CountryDetail({ params }) {
    const country = await getCountryDetails(params.country);
    const nativeNames = Object.values(country.name.nativeName).map(name => name.common).join(",");
    const languages = Object.values(country.languages).join(",");
    const currencies = Object.values(country.currencies).map(curr => curr.name).join(",");
    const topLevelDomain = country.tld.join(",");
    const capitals = country.capital.join(",");
    const subregion = country.subregion;
    const borders = country.borderedCountries.map(b => b.name.common);
    return (
      <div className="flex gap-16 px-16">
        <img alt={`${country.name.common}'s flag`} src={country.flags.png} className="block"/>
        <div>
          <h2 className="text-lg font-bold text-skin-base">{country.name.common}</h2>
          <div className="flex gap-8 align-center">
            <div>
              <p>Native Name: {nativeNames}</p>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              {!!subregion && <p>Sub Region: {subregion}</p>}
              <p>Capital: {capitals}</p>
            </div>
            <div>
              <p>Top Level Domain: {topLevelDomain}</p>
              <p>Currencies: {currencies}</p>
              <p>Languages: {languages}</p>
            </div>
          </div>
          {borders.length > 0 &&
            <p>
            Border Countries:
            {borders.map(border => 
              <Link href={border}>{border}</Link>)}
            </p>}
        </div>
      </div>
    );

}

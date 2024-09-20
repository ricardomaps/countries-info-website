import Link from "next/link";

export default function CountryCard({name, flags, population, region, capital}) {
    return (
      <article className="bg-skin-card rounded-md h-full w-full shadow-md">
        <img alt={`${name}'s flag`} src={flags.svg} className="block h-44 w-full rounded-t-lg object-cover"/>
        <div className="p-6">
          <Link href={`./${name}`}>
            <p className="text-skin-base text-lg font-semibold"> {name} </p>
          </Link>
          <p className="text-skin-base"> <span>Population:</span> <span className="text-skin-muted">{population}</span> </p>
          <p className="text-skin-base"> <span>Region:</span>     <span className="text-skin-muted">{region}</span> </p>
          <p className="text-skin-base"> <span>Capital:</span>    <span className="text-skin-muted">{capital}</span> </p>
        </div>
      </article>
    );
}

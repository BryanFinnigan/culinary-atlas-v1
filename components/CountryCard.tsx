import Link from "next/link";
import CountryImage from "@/components/CountryImage";

type CountryCardProps = {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  image?: string;
};

export default function CountryCard({ name, slug, description, tags, image }: CountryCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-950/10">
      <Link href={`/cuisines/${slug}`} className="block focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-4">
        <CountryImage
          src={image}
          country={name}
          alt={`${name} cuisine and culinary traditions`}
          aspectClassName="aspect-[4/3]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">Country guide</p>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{name}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-orange-100">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 text-sm font-black text-orange-700 transition group-hover:translate-x-1">
            Explore {name} →
          </div>
        </div>
      </Link>
    </article>
  );
}

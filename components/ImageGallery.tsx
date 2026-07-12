import CountryImage from "@/components/CountryImage";

export default function ImageGallery({ images = [], country }: { images?: string[]; country: string }) {
  if (images.length === 0) return null;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {images.slice(0, 4).map((src, index) => (
        <CountryImage
          key={`${src}-${index}`}
          src={src}
          country={country}
          alt={`${country} culinary scene ${index + 1}`}
          aspectClassName="aspect-[4/3]"
          className="rounded-[1.5rem] shadow-lg shadow-slate-950/10"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ))}
    </div>
  );
}

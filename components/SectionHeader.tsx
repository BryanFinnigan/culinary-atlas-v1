type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="atlas-eyebrow">{eyebrow}</p>
      <h2 className="atlas-heading mt-3">{title}</h2>
      {description ? <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{description}</p> : null}
    </div>
  );
}

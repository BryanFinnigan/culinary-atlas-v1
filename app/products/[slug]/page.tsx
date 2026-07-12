import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allProducts,
  getCuisineBySlug,
  getProductBySlug,
  productSlug,
  slugify,
} from "@/lib/cuisines";

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: productSlug(product) }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found | Culinary Atlas" };
  return {
    title: `${product.productName} Guide | Culinary Atlas`,
    description: product.whyTryIt,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const countrySlug = slugify(product.country);
  const collectionSlug = slugify(product.collection || "Taste Collection");
  const categorySlug = slugify(product.category || "Products");
  const cuisine = getCuisineBySlug(countrySlug);
  const relatedProducts = allProducts.filter((item)=>item.id!==product.id&&item.country===product.country&&(item.category===product.category||item.collection===product.collection)).slice(0,4);
  return (<main className="min-h-screen bg-orange-50 text-slate-950"><section className="px-6 py-8 sm:px-10 lg:px-16"><div className="mx-auto max-w-5xl"><nav aria-label="Breadcrumb" className="text-sm font-semibold text-slate-600"><Link href="/">Home</Link> / <Link href={`/cuisines/${countrySlug}`}>{product.country}</Link> / <Link href={`/cuisines/${countrySlug}/${collectionSlug}`}>{product.collection}</Link> / <Link href={`/cuisines/${countrySlug}/${collectionSlug}/${categorySlug}`}>{product.category}</Link></nav><article className="mt-8 rounded-[2rem] border border-orange-100 bg-white p-7 shadow-sm sm:p-10"><p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">{product.country} product guide</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">{product.productName}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{product.whyTryIt}</p><dl className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-orange-50 p-4"><dt>Collection</dt><dd>{product.collection}</dd></div><div className="rounded-2xl bg-orange-50 p-4"><dt>Category</dt><dd>{product.category}</dd></div><div className="rounded-2xl bg-orange-50 p-4"><dt>Discovery level</dt><dd>{product.discoveryLevel}</dd></div><div className="rounded-2xl bg-orange-50 p-4"><dt>Price tier</dt><dd>{product.priceTier}</dd></div></dl>{((product.typicalUse?.length ?? 0)>0)&&(<section className="mt-8"><h2 className="text-2xl font-black">How people use it</h2><div className="mt-4 flex flex-wrap gap-2">{product.typicalUse!.map(use=><span key={use}>{use}</span>)}</div></section>)}<a href={product.affiliateUrl} target="_blank" rel="nofollow sponsored noopener noreferrer">View on Amazon</a></article></div></section></main>);
}
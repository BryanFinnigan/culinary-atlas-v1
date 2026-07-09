# Culinary Atlas data operating system

This folder is the product asset layer. The website should stay replaceable; the structured data should keep getting more valuable.

## Core files

- `cuisines.json` — country-level cuisine summaries, Food & Culture Notes, beginner foods, premium foods, and export-friendly products.
- `products.json` — United Kingdom product catalog.
- `products-italy.json` — Italy product catalog.
- `productCatalog.ts` — combines country product files into one app-ready catalog.

## Product taxonomy

Every product should include:

- `id`
- `country`
- `region`
- `collection`
- `category`
- `subcategory`
- `productName`
- `brand`
- `affiliateUrl`
- `retailer`
- `whyTryIt`
- `typicalUse`
- `discoveryLevel`
- `priceTier`
- `exportFriendly`
- `tags`

Optional growth fields:

- `seoFocus`
- `relatedProducts`
- `sourceNotes`
- `availabilityStatus`
- `lastChecked`

## Six Sigma quality rhythm

Use DMAIC for each country release:

1. Define the country collection and revenue goal.
2. Measure product count, collection coverage, and link completeness.
3. Analyze gaps: missing beginner foods, premium items, SEO products, or regional context.
4. Improve by adding products, refining collections, and publishing landing pages.
5. Control quality with duplicate checks, affiliate-link checks, and consistent taxonomy.

## Release checklist

Before pushing a country collection live:

- Country exists in `cuisines.json`.
- Products use the exact country name from `cuisines.json`.
- Product links are preserved exactly as collected.
- Products are grouped into useful collections.
- `whyTryIt` explains user value, not just product features.
- Affiliate links use sponsored/noopener/noreferrer attributes in the UI.
- Country page has culture notes and beginner-friendly starting points.

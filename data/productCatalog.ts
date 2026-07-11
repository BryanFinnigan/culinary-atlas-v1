import ukProducts from "./products.json";
import italyProducts from "./products-italy.json";
import franceProducts from "./products-france.json";
import mexicoProducts from "./products-mexico.json";

export type ProductRecord = {
  id: string;
  country: string;
  region?: string;
  collection?: string;
  category?: string;
  subcategory?: string;
  productName: string;
  brand?: string;
  affiliateUrl: string;
  retailer?: string;
  whyTryIt: string;
  typicalUse?: string[];
  discoveryLevel?: string;
  priceTier?: string;
  exportFriendly?: boolean;
  seoFocus?: boolean;
  tags?: string[];
};

const products = [
  ...ukProducts,
  ...italyProducts,
  ...franceProducts,
  ...mexicoProducts,
] as ProductRecord[];

export default products;

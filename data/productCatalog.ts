import ukProducts from "./products.json";
import italyProducts from "./products-italy.json";
import franceProducts from "./products-france.json";
import mexicoProducts from "./products-mexico.json";

const products = [
  ...ukProducts,
  ...italyProducts,
  ...franceProducts,
  ...mexicoProducts,
];

export default products;

import { products } from "./data";
export type ProductFilters = {
  brand: string;
  type: string;
  material: string;
  application: string;
};
export function filterProducts(filters: ProductFilters) {
  return products.filter(
    (p) =>
      (!filters.brand || p.brand === filters.brand) &&
      (!filters.type || p.type === filters.type) &&
      (!filters.material || p.material === filters.material) &&
      (!filters.application || p.applications.includes(filters.application)),
  );
}

// Formato de precios en pesos colombianos, sin decimales: 30000 → "$ 30.000".
const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return copFormatter.format(price);
}

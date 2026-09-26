// Formato de precios en pesos colombianos, sin decimales: 30000 → "$30.000".
const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  // Intl pone un espacio entre "$" y el número; lo quitamos: "$30.000".
  return copFormatter.format(price).replace(/\s/g, "");
}

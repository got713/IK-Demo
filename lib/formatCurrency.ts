export function formatCurrency(amount: number, currency: string = "EGP"): string {
  if (currency === "EGP") {
    return `${amount.toLocaleString("en-US")} EGP`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

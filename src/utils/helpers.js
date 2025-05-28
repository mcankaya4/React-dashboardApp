export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value,
  );

export const sortCabins = {
  "name-asc": (a, b) => a.name.localeCompare(b.name),
  "name-desc": (a, b) => b.name.localeCompare(a.name),
  "regularPrice-asc": (a, b) => a.regularPrice - b.regularPrice,
  "regularPrice-desc": (a, b) => b.regularPrice - a.regularPrice,
  "capacity-asc": (a, b) => a.capacity - b.capacity,
  "capacity-desc": (a, b) => b.capacity - a.capacity,
};

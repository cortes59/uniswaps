export const stringSorter = (field) => (a, b) =>
  (a[field] || "")
    .toLowerCase()
    .trim()
    .localeCompare((b[field] || "").toLowerCase().trim());

export const numberSorter = (field) => (a, b) =>
  (parseFloat(a[field]) || 0) - (parseFloat(b[field]) || 0);

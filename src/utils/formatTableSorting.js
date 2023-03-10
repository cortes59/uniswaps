export const formatTableSorting = (ordering) => {
  const { order, column } = ordering;

  let orderDirection = null;
  if (order === "ascend") {
    orderDirection = "asc";
  } else if (order === "descend") {
    orderDirection = "desc";
  }

  return {
    orderBy: column?.sortKey || null,
    orderDirection,
  };
};

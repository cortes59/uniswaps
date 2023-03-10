import { useQuery } from "@apollo/client";
import { Button, Table } from "antd";
import { useState } from "react";
import { TOP_POOLS_QUERY } from "../../../data/Queries";
import { formatTableSorting } from "../../../utils/formatTableSorting";
import { formatPrice, formatVolume } from "../../../utils/formatters";
import { numberSorter, stringSorter } from "../../../utils/sorters";
import InfinitePagination from "../../InfinitePagination";

const columns = [
  {
    title: "Pool",
    key: "pool",
    sortKey: "id",
    sorter: stringSorter("id"),
    render(record) {
      return <p>{record.id}</p>;
    },
  },
  {
    title: "Pair",
    key: "symbol",
    render(record) {
      return (
        <p>
          {record.token0.symbol} / {record.token1.symbol}
        </p>
      );
    },
  },
  {
    title: "TVL",
    key: "totalValueLocked",
    sortKey: "totalValueLockedToken0",
    sorter: numberSorter("totalValueLockedToken0"),
    render(record) {
      return (
        <p>
          {formatVolume(record.totalValueLockedToken0)} /{" "}
          {formatVolume(record.totalValueLockedToken1)}
        </p>
      );
    },
  },
  {
    title: "TVL USD",
    key: "totalValueLockedUSD",
    sortKey: "totalValueLockedUSD",
    sorter: numberSorter("totalValueLockedUSD"),
    render(record) {
      return <p>{formatPrice(record.totalValueLockedUSD)}</p>;
    },
  },
  {
    title: "24H Volume",
    key: "volume",
    sortKey: "volumeUSD",
    sorter: numberSorter("volumeUSD"),
    render(record) {
      return <p>{formatVolume(record.volumeUSD)}</p>;
    },
  },
];

const TopPoolsTable = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    orderBy: null,
    orderDirection: null,
  });

  const { loading, data, refetch } = useQuery(TOP_POOLS_QUERY, {
    variables: {
      first: pagination.pageSize,
      skip:
        pagination.page > 1 ? (pagination.page - 1) * pagination.pageSize : 0,
      orderBy: pagination.orderBy,
      orderDirection: pagination.orderDirection,
    },
  });

  const onRefresh = () => {
    refetch();
  };

  const onChange = (_, __, order) => {
    const orderData = formatTableSorting(order);
    setPagination({ ...pagination, ...orderData });
  };

  const onPaginationChange = (newPagination) =>
    setPagination({ ...pagination, ...newPagination });

  return (
    <div>
      <div className="refetch-container">
        <Button type="primary" onClick={onRefresh} disabled={loading}>
          Refresh
        </Button>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data?.pools}
        pagination={false}
        onChange={onChange}
      />
      <InfinitePagination
        page={pagination.page}
        pageSize={pagination.pageSize}
        onChange={onPaginationChange}
      />
    </div>
  );
};

export default TopPoolsTable;

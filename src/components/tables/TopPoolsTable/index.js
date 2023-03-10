import { useQuery } from "@apollo/client";
import { Button, Table } from "antd";
import { useState } from "react";
import { TOP_POOLS_QUERY } from "../../../data/Queries";
import { formatPrice, formatVolume } from "../../../utils/formatters";
import InfinitePagination from "../../InfinitePagination";

const columns = [
  {
    title: "Pool",
    key: "pool",
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
    render(record) {
      return <p>{formatPrice(record.totalValueLockedUSD)}</p>;
    },
  },
  {
    title: "24H Volume",
    key: "volume",
    render(record) {
      return <p>{formatVolume(record.volumeUSD)}</p>;
    },
  },
];

const TopPoolsTable = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const { loading, data, refetch } = useQuery(TOP_POOLS_QUERY, {
    variables: {
      first: pagination.pageSize,
      skip:
        pagination.page > 1 ? (pagination.page - 1) * pagination.pageSize : 0,
    },
  });

  const onRefresh = () => {
    refetch();
  };

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
      />
      <InfinitePagination
        page={pagination.page}
        pageSize={pagination.pageSize}
        onChange={setPagination}
      />
    </div>
  );
};

export default TopPoolsTable;

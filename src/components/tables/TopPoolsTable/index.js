import { useQuery } from "@apollo/client";
import { Button, Table } from "antd";
import { TOP_POOLS_QUERY } from "../../../data/Queries";
import { formatPrice, formatVolume } from "../../../utils/formatters";

const columns = [
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
  const { loading, data, refetch } = useQuery(TOP_POOLS_QUERY);

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
      <Table loading={loading} columns={columns} dataSource={data?.pools} />
    </div>
  );
};

export default TopPoolsTable;

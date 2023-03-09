import { useQuery } from "@apollo/client";
import { Table } from "antd";
import moment from "moment";
import { useState } from "react";
import {
  TOKENS_BY_DATE,
  TOP_POOLS_QUERY,
  TRANSACTIONS_BY_DATE,
} from "../../../data/Queries";
import {
  formatAmount,
  formatChangePercentage,
  formatPrice,
  formatVolume,
} from "../../../utils/formatters";
import { getValuesDiffClass } from "../../../utils/helpers";

function getRecordType(record) {
  if (record.mints.length) return "mints";
  if (record.burns.length) return "burns";
  return "swaps";
}

const columns = [
  {
    title: "Type",
    key: "type",
    render(record) {
      return <p>{getRecordType(record)}</p>;
    },
  },
  {
    title: "Pair",
    key: "pair",
    render(record) {
      const type = getRecordType(record);

      return (
        <>
          {record[type]?.map((item) => (
            <p key={item.id}>
              {item.token0.symbol}/{item.token1.symbol}
            </p>
          ))}
        </>
      );
    },
  },
  {
    title: "Amount",
    key: "amount",
    render(record) {
      const type = getRecordType(record);

      return (
        <>
          {record[type]?.map((item) => (
            <p key={item.id}>
              {formatAmount(parseFloat(item.amount0 || 0))} /{" "}
              {formatAmount(parseFloat(item.amount1 || 0))}
            </p>
          ))}
        </>
      );
    },
  },
  {
    title: "Total USD",
    key: "amountUSD",
    render(record) {
      return (
        <p>{formatPrice(record[getRecordType(record)]?.[0]?.amountUSD || 0)}</p>
      );
    },
  },
  {
    title: "Timestamp",
    key: "timestamp",
    render(record) {
      return <p>{moment(parseInt(record.timestamp) * 1000).fromNow()}</p>;
    },
  },
];

const TransactionsTable = ({ date }) => {
  const { loading, data } = useQuery(TRANSACTIONS_BY_DATE, {
    variables: {
      startDate: date?.clone().utc().startOf("day").subtract(1, "day").unix(),
      endDate: date?.clone().utc().startOf("day").unix(),
    },
    skip: !date,
  });
  console.log(data);

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data?.transactions}
    />
  );
};

export default TransactionsTable;

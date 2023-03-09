import { useQuery } from "@apollo/client";
import { Table } from "antd";
import { useState } from "react";
import { TOP_POOLS_QUERY } from "../../../data/Queries";

const columns = [
  {
    title: "Token",
    key: "symbol",
    dataIndex: "symbol",
  },
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "Open",
    key: "openPrice",
    render(record) {
      if (!record.tokenDayData.length) return "-";
      return record.tokenDayData[0].open;
    },
  },
  {
    title: "Close",
    key: "closePrice",
    render(record) {
      if (!record.tokenDayData.length) return "-";
      return record.tokenDayData[0].close;
    },
  },
  {
    title: "24H Volume",
    key: "volume",
    render(record) {
      if (!record.tokenDayData.length) return "-";
      return record.tokenDayData[0].volume;
    },
  },
];
const TopPoolsTable = () => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const { loading, data } = useQuery(TOP_POOLS_QUERY, {
    variables: { first: perPage, skip: page > 1 ? (page - 1) * perPage : 0 },
  });

  console.log({ data });
  return <Table columns={columns} dataSource={data?.pools} />;
};

export default TopPoolsTable;

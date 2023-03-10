import { useQuery } from "@apollo/client";
import { Button, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { TRANSACTIONS_BY_DATE } from "../../../data/Queries";
import { formatTableSorting } from "../../../utils/formatTableSorting";
import { formatAmount, formatPrice } from "../../../utils/formatters";
import { numberSorter } from "../../../utils/sorters";
import InfinitePagination from "../../InfinitePagination";

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
              {item.token0.symbol} / {item.token1.symbol}
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
    sortKey: "timestamp",
    sorter: numberSorter("timestamp"),
    render(record) {
      return <p>{moment(parseInt(record.timestamp) * 1000).fromNow()}</p>;
    },
  },
];

const TransactionsTable = ({ date }) => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    orderBy: "timestamp",
    orderDirection: "desc",
  });

  const variables = {
    startDate: date?.clone().utc().startOf("day").subtract(1, "day").unix(),
    endDate: date?.clone().utc().startOf("day").unix(),
    first: pagination.pageSize,
    skip: pagination.page > 1 ? (pagination.page - 1) * pagination.pageSize : 0,
    orderBy: pagination.orderBy,
    orderDirection: pagination.orderDirection,
  };

  const { loading, data, refetch } = useQuery(TRANSACTIONS_BY_DATE, {
    variables,
    skip: !date,
  });

  const onRefresh = () => {
    refetch(variables);
  };

  const onChange = (_, __, order) => {
    const orderData = formatTableSorting(order);
    setPagination({ ...pagination, ...orderData });
  };

  const onPaginationChange = (newPagination) =>
    setPagination({ ...pagination, ...newPagination });

  return (
    <div>
      <div class="refetch-container">
        <Button type="primary" onClick={onRefresh} disabled={loading}>
          Refresh
        </Button>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={data?.transactions}
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

export default TransactionsTable;

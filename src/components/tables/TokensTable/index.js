import { useQuery } from "@apollo/client";
import { Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { TOKENS_BY_DATE, TOP_POOLS_QUERY } from "../../../data/Queries";
import {
  formatChangePercentage,
  formatPrice,
  formatVolume,
} from "../../../utils/formatters";
import { getValuesDiffClass } from "../../../utils/helpers";

function DiffPercentage({ oldVal, newVal }) {
  return (
    <small
      style={{ marginLeft: 5 }}
      className={getValuesDiffClass(oldVal, newVal)}
    >
      {formatChangePercentage(oldVal, newVal)}
    </small>
  );
}

const columns = [
  {
    title: "Token",
    key: "symbol",
    render(record) {
      return (
        <p>
          {record.name} ({record.symbol})
        </p>
      );
    },
  },
  {
    title: "Open",
    key: "openPrice",
    render(record) {
      if (!record.tokenDayData.length) return "-";
      return (
        <p>
          {formatPrice(
            record.tokenDayData[record.tokenDayData.length - 1].open
          )}
        </p>
      );
    },
  },
  {
    title: "Close",
    key: "closePrice",
    render(record) {
      if (!record.tokenDayData.length) return "-";
      return (
        <p>
          {formatPrice(
            record.tokenDayData[record.tokenDayData.length - 1].close
          )}{" "}
          <DiffPercentage
            oldVal={record.tokenDayData[record.tokenDayData.length - 1].open}
            newVal={record.tokenDayData[record.tokenDayData.length - 1].close}
          />
        </p>
      );
    },
  },
  {
    title: "High",
    key: "high",
    render(record) {
      if (!record.tokenDayData.length) return "-";
      return (
        <p>
          {formatPrice(
            record.tokenDayData[record.tokenDayData.length - 1].high
          )}
          {record.tokenDayData.length > 1 ? (
            <DiffPercentage
              oldVal={record.tokenDayData[0].high}
              newVal={record.tokenDayData[1].high}
            />
          ) : null}
        </p>
      );
    },
  },
  {
    title: "Low",
    key: "low",
    render(record) {
      if (!record.tokenDayData.length) return "-";
      return (
        <p>
          {formatPrice(record.tokenDayData[record.tokenDayData.length - 1].low)}
          {record.tokenDayData.length > 1 ? (
            <DiffPercentage
              oldVal={record.tokenDayData[0].low}
              newVal={record.tokenDayData[1].low}
            />
          ) : null}
        </p>
      );
    },
  },
  {
    title: "24h Volume",
    key: "volume",
    render(record) {
      if (!record.tokenDayData.length) return "-";
      return (
        <p>
          {formatVolume(
            record.tokenDayData[record.tokenDayData.length - 1].volume
          )}
          {record.tokenDayData.length > 1 ? (
            <DiffPercentage
              oldVal={record.tokenDayData[0].volume}
              newVal={record.tokenDayData[1].volume}
            />
          ) : null}
        </p>
      );
    },
  },
  {
    title: "TVL",
    key: "totalValueLocked",
    render(record) {
      if (!record.tokenDayData.length) return "-";
      return (
        <p>
          {formatVolume(
            record.tokenDayData[record.tokenDayData.length - 1].totalValueLocked
          )}
          {record.tokenDayData.length > 1 ? (
            <DiffPercentage
              oldVal={record.tokenDayData[0].totalValueLocked}
              newVal={record.tokenDayData[1].totalValueLocked}
            />
          ) : null}
        </p>
      );
    },
  },
];

const TokensTable = ({ date }) => {
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
  });
  // const [date, setDate] = useState(moment(1649462400000));
  const { loading, data } = useQuery(TOKENS_BY_DATE, {
    variables: {
      startDate: date?.clone().utc().startOf("day").subtract(1, "day").unix(),
      endDate: date?.clone().utc().startOf("day").unix(),
      // first: pagination.perPage,
      // skip:
      //   pagination.page > 1 ? (pagination.page - 1) * pagination.perPage : 0,
    },
    skip: !date,
  });

  const onChange = (newPage, newPageSize) => {
    setPagination({
      page: newPage,
      perPage: newPageSize,
    });
  };

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data?.tokens}
      // pagination={{
      //   pageSize: pagination.perPage,
      //   onChange: onChange,
      //   current: pagination.page,
      // }}
    />
  );
};

export default TokensTable;

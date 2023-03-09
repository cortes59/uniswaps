import { DatePicker, Tabs } from "antd";
import moment from "moment";
import { useState } from "react";
import "./App.css";
import TokensTable from "./components/tables/TokensTable";
import TopPoolsTable from "./components/tables/TopPoolsTable";
import TransactionsTable from "./components/tables/TransactionsTable";

function App() {
  const [date, setDate] = useState(moment());

  return (
    <div className="App">
      <div className="date-picker-container">
        <DatePicker
          onChange={(_, val) => {
            setDate(moment(val));
            console.log({ val, _ });
          }}
        />
      </div>
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        items={[
          {
            label: "Top Pools",
            key: "1",
            children: (
              <div className="container">
                <TopPoolsTable date={date} />
              </div>
            ),
          },
          {
            label: "Tokens",
            key: "2",
            children: (
              <div className="container">
                <TokensTable date={date} />
              </div>
            ),
          },
          {
            label: "Transactions",
            key: "3",
            children: (
              <div className="container">
                <TransactionsTable date={date} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default App;

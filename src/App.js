import { DatePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import "./App.css";
import TokensTable from "./components/tables/TokensTable";
import TopPoolsTable from "./components/tables/TopPoolsTable";
import TransactionsTable from "./components/tables/TransactionsTable";

function App() {
  const [date, setDate] = useState(moment());
  // console.log({ date });

  // const onDateChange = ()
  return (
    <div className="App">
      {/* <TopPoolsTable /> */}
      <DatePicker
        // defaultValue={date}
        onChange={(_, val) => {
          setDate(moment(val));
          console.log({ val, _ });
        }}
      />
      {/* <TokensTable date={date} /> */}
      <TransactionsTable date={date} />
    </div>
  );
}

export default App;

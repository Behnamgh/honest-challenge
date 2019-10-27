import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import AddressEntry from "./AddressEntry";
import ResultView from "./ResultView";
import { getOutlet } from "../utils/apiHelper";

const App: React.FC = () => {

  const [addressName, changeAddress] = useState("");
  const [result, updateResult] = useState();

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await getOutlet(addressName);
      updateResult({name: response.data.name || "", founded: response.status === 200});
    }
    fetchData();
  }, [addressName]);

  return (
    <div className="App">
      <NavBar />
      <AddressEntry addressName={addressName} changeAddress={changeAddress} />
      { result && addressName && <ResultView result={result} />}
    </div>
  );
};

export default App;

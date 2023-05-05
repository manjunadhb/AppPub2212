import { useState } from "react";
import "./App.css";

function App() {
  let [internees, setInternees] = useState([]);

  let getDataFromServer = async () => {
    let reqOptions = {
      method: "GET",
    };

    let JSONData = await fetch("/getInternees", reqOptions);
    let JSOData = await JSONData.json();
    setInternees(JSOData);
    console.log(JSOData);
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          getDataFromServer();
        }}
      >
        Get Data from DB
      </button>
      {internees.map((internee) => {
        return (
          <div>
            <h1>{internee.name}</h1>
            <h2>{internee.email}</h2>
            <h2>{internee.gender}</h2>
            <h2>{internee.age}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default App;

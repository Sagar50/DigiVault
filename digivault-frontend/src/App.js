import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { fetchHello } from "./api/apiService";
import { getAssets } from "./api/apiService";
import axios from "axios";
import UserHoldings from "./components/UserHoldings";
function App() {
  // const [testResult, setTestResult] = useState('');
  //
  // const checkMongoConnection = () => {
  //     fetch('http://localhost:8080/testMongoConnection')
  //         .then((response) => response.text())
  //         .then((data) => {
  //             setTestResult(data);  // Update the UI with the result
  //         })
  //         .catch((error) => {
  //             setTestResult('Error connecting to MongoDB');
  //             console.error('Error:', error);
  //         });
  // };
  //
  // return (
  //     <div>
  //         <h1>Test MongoDB Connection</h1>
  //         <button onClick={checkMongoConnection}>Check MongoDB Connection</button>
  //         {testResult && <p>{testResult}</p>}
  //     </div>
  // );



  return (
      <div className="App">
        <h1>DigiVault</h1>
        <main>
          <UserHoldings />
        </main>
      </div>
  );
}

export default App;
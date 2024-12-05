import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { fetchHello } from "./api/apiService";
import { getAssets } from "./api/apiService";
import axios from "axios";
import UserHoldings from "./components/UserHoldings";
import {UpdateUser} from "./components/UpdateUser";
import Navbar from "./components/Navigation/Navbar";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import LoginRegisterPage from "./components/LoginRegistration/LoginRegisterPage";
import {LandingPage} from "./components/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));
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
      <BrowserRouter>

          <div className="App" style={{padding: '20px'}}>
              <Navbar/>
              <Routes>
                  <Route path="/login" element={ <LoginRegisterPage />}  />
                  <Route  path="/register" element={<LoginRegisterPage />} />
                  <Route path="/home" element={ <LandingPage /> }/>
                  <Route path="/addWallet" element={ <UpdateUser /> } />
                  <Route path="/portfolio" element={ <UserHoldings /> } />


              </Routes>
              <Footer />
          </div>
      </BrowserRouter>

  );
}

export default App;
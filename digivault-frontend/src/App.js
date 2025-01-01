
import './App.css';
import React, { useState } from 'react';


import {AddWallet} from "./components/AddWallet/AddWallet";
import Navbar from "./components/Navigation/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import LoginRegisterPage from "./components/LoginRegistration/LoginRegisterPage";
import {LandingPage} from "./components/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import WalletAddedCheckMark from "./components/Animated/WalletAddedCheckMark";
import Portfolio from "./components/Portfolio/Portfolio";
import {ViewChart} from "./components/ViewChart/ViewChart";
import TrendingPage from "./components/Trending/TrendingPage";
import 'font-awesome/css/font-awesome.min.css';
import News from "./components/News/News";
import { Analytics } from '@vercel/analytics/react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));


  return (
      <BrowserRouter>

          <div className="App" style={{padding: '20px'}}>
              <Navbar/>
              <Routes>
                  <Route path="/login" element={ <LoginRegisterPage />}  />
                  <Route path="/register" element={<LoginRegisterPage />} />
                  <Route path="/" element={ <LandingPage /> }/>
                  <Route path="/addWallet" element={ <ProtectedRoute isLoggedIn={isLoggedIn}> <AddWallet /> </ProtectedRoute>} />
                  <Route path="/portfolio" element={ <ProtectedRoute isLoggedIn={isLoggedIn}> <Portfolio /> </ProtectedRoute>} />
                  <Route path="/walletAdded" element={ <ProtectedRoute isLoggedIn={isLoggedIn}> <WalletAddedCheckMark /> </ProtectedRoute>} />
                  <Route path="/viewChart" element={ <ProtectedRoute isLoggedIn={isLoggedIn}> <ViewChart /> </ProtectedRoute>} />
                  <Route path="/trendingCrypto" element={ <ProtectedRoute isLoggedIn={isLoggedIn}> <TrendingPage /> </ProtectedRoute> } />
                  <Route path="/news" element={ <ProtectedRoute isLoggedIn={isLoggedIn}> <News /> </ProtectedRoute> } />
              </Routes>
              <Footer />
          </div>
          <Analytics />
      </BrowserRouter>

  );
}

export default App;
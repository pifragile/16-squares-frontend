//import "terminal.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { React, useState, createContext } from "react";
import Home from "./components/Home";
import TokenDetail from "./components/TokenDetail";
import User from "./components/User";
import MarketPlace from "./components/Marketplace";
import About from "./components/About";

import { WalletContext, beaconWallet } from "./lib/wallet";
export const ModeContext = createContext(0);
export const SeriesContext = createContext([]);

function App() {
    const [wallet] = useState(beaconWallet);
    return (
        <WalletContext.Provider value={wallet}>
            <div className="App">
                <Routes>
                    <Route path="/mint" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/token-detail/:contract/:tokenId"
                        element={<TokenDetail />}
                    />
                    <Route path="/user/:address" element={<User />} />
                    <Route path="/" element={<MarketPlace />} />
                </Routes>
            </div>
        </WalletContext.Provider>
    );
}

export default App;

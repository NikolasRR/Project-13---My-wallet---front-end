import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import TokenContext from "./../contexts/TokenContext.js";
import transactionContext from "./../contexts/transactionContext.js";

import SignInScreen from "./SignInScreen.js";
import SignUpScreen from "./SignUpScreen.js";
import MainScreen from "./MainScreen.js";
import NewTransactionScreen from "./NewTransactionScreen.js";

import "../assets/css/reset.css";
import "../assets/css/style.css";

function App() {
    const [token, setToken] = useState(null);
    const [profitOrSpent, setProfitOrSpent] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("userToken") !== null) {
            setToken(JSON.parse(localStorage.getItem("userToken")));
        }
    }, []);

    useEffect(() => {
        const everyFiveSeconds = 5000;
        if (token) {
            const attStatus = setInterval(() => {
                console.log("rodou uma vez")
                axios.post("http://localhost:5000/status", {},
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    .then()
                    .catch(error => {
                        clearInterval(attStatus);
                    });
            }, everyFiveSeconds);
        }
    }, [token])


    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <transactionContext.Provider value={{ profitOrSpent, setProfitOrSpent }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignInScreen />} />
                        <Route path="/sign-up" element={<SignUpScreen />} />
                        <Route path="/main" element={<MainScreen />} />
                        <Route path="/newTransaction" element={<NewTransactionScreen />} />
                    </Routes>
                </BrowserRouter>
            </transactionContext.Provider >
        </TokenContext.Provider>
    )
}

export default App;
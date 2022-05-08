import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import TokenContext from "./../contexts/TokenContext.js";

import SignInScreen from "./SignInScreen.js";
import SignUpScreen from "./SignUpScreen.js";
import MainScreen from "./MainScreen.js";
import NewTransactionScreen from "./NewTransactionScreen.js";

function App() {
    const [token, setToken] = useState("");

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignInScreen />} />
                    <Route path="/sign-up" element={<SignUpScreen />} />
                    <Route path="/main" element={<MainScreen />} />
                    <Route path="/newTransaction" element={<NewTransactionScreen />} />
                </Routes>
            </BrowserRouter>
        </TokenContext.Provider>
    )
}

export default App;
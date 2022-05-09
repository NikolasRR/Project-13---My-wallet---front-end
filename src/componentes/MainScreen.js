import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import TokenContext from "./../contexts/TokenContext";
import transactionContext from "./../contexts/transactionContext"

import Transaction from "./Transaction.js";


function MainScreen() {
    const navigate = useNavigate();
    const [statement, setstatement] = useState([]);
    const { token } = useContext(TokenContext);
    const { profitOrSpent, setProfitOrSpent } = useContext(transactionContext);

    useEffect(() => {
        if (token) {
            axios.get("http://localhost:5000/main",
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(res => {
                    setstatement(res.data.statement);
                })
                .catch(error => {
                    alert("session expired");
                    navigate("/");
                });
        }
    }, [token]);

    function typeOfTransaction (type) {
        setProfitOrSpent(type);
        navigate("/newTransaction");
    }




    return (
            <Section>
                <Header>
                    <H1>Olá, {token}</H1>
                </Header>
                {statement.map(transaction => <Transaction transaction={transaction} />)}
                <Options>
                    <Button onClick={() => typeOfTransaction("profit") }>Nova entrada</Button>
                    <Button onClick={() => typeOfTransaction("spent") }>Nova saída</Button>
                </Options>
            </Section>
    )
}

export default MainScreen;

const Section = styled.section`
    background-color: #A328D6;
`;

const Header = styled.header`
    background-color: #A328D6;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 375px;
`;

const Options = styled.div`
    
`;

const H1 = styled.h1`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 326px;
    background-color: blue;
`;

const Div = styled.div`
    
`;

const Button = styled.button`
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
`;

const StyledLink = styled(Link)`
`;
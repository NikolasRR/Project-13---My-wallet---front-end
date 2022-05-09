import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import TokenContext from "./../contexts/TokenContext";
import transactionContext from "./../contexts/transactionContext"

import Transaction from "./Transaction.js";


function MainScreen() {
    const navigate = useNavigate();
    const [statement, setstatement] = useState([]);
    const [name, setName] = useState("");
    const [total, setTotal] = useState(0);
    const { token, setToken } = useContext(TokenContext);
    const { setProfitOrSpent } = useContext(transactionContext);

    useEffect(() => {
        if (token) {
            axios.get("https://mywalletproject13.herokuapp.com/main",
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(res => {
                    setstatement(res.data.statement);
                    setName(res.data.name);
                    let sum = 0;
                    res.data.statement.forEach(transaction => {
                        sum += parseInt(transaction.value);
                    });
                    setTotal(sum);
                })
                .catch(error => {
                    alert("session expired");
                    navigate("/");
                });
        }
    }, [token]);

    function typeOfTransaction(type) {
        setProfitOrSpent(type);
        navigate("/newTransaction");
    }

    function exit() {
        setToken(null);
        navigate("/");
    }

    return (
        <Section>
            <Header>
                <H1>Olá, {name}</H1>
                <ion-icon style={{ color: "#FFFFFF", fontSize: "26px" }} onClick={() => exit()} name="exit-outline"></ion-icon>
            </Header>
            {statement.length > 0 ? (
                <Statement>
                    {statement.map((transaction, index) => <Transaction key={index} transaction={transaction} />)}
                    <Total>
                        {total}
                    </Total>
                </Statement>) : (
                <Statement>
                    <H4>Não há registros de entrada ou saída</H4>
                </Statement>
            )}
            <Options>
                <Button onClick={() => typeOfTransaction("profit")}>Nova entrada</Button>
                <Button onClick={() => typeOfTransaction("spent")}>Nova saída</Button>
            </Options>
        </Section>
    )
}

export default MainScreen;

const Section = styled.section`
    background-color: #8C11BE;
`;

const Header = styled.header`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 328px;
    margin: 25px 24px;
`;

const Statement = styled.div`
    background-color: #FFFFFF;
    width: 328px;
    margin: 25px 24px;
    border-radius: 5px;
    height: 446px;
    overflow-y: scroll;
`;

const H4 = styled.h4`
`;

const Total = styled.div`
`;

const Options = styled.div`
    
`;

const H1 = styled.h1`
    color: #FFFFFF;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    font-family: 'Raleway', sans-serif;
`;

const Button = styled.button`
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
`;

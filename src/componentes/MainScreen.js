import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

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
            axios.get("http://localhost:5000/main",
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
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
            {statement?.length > 0 ? (
                <Statement>
                    <ABD>{statement.map((transaction, index) => <Transaction key={index} transaction={transaction} />)}</ABD>
                    <Total>
                        <H6>SALDO: </H6>
                        <P props={total < 0}>{parseFloat(total).toFixed(2)}</P>
                    </Total>
                </Statement>) : (
                <Statement>
                    <H4>Não há registros de entrada ou saída</H4>
                </Statement>
            )}
            <Options>
                <Button onClick={() => typeOfTransaction("profit")}>
                    <Div>
                        <PlusIcon />
                        <Text>Nova entrada</Text>
                    </Div>
                </Button>
                <Button onClick={() => typeOfTransaction("spent")}>
                    <Div>
                        <MinusIcon />
                        <Text>Nova saída</Text>
                    </Div>
                </Button>
            </Options>
        </Section>
    )
}

export default MainScreen;

const ABD = styled.div`
`;

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
    margin: 25px auto;
    padding: 23px 12px 10px 12px;
    border-radius: 5px;
    height: 446px;
    box-sizing: border-box;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const H4 = styled.h4`
`;

const Total = styled.div`
    display: flex;
    justify-content: space-between;
`;

const H6 = styled.h6`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
`;

const P = styled.p`
    color: ${({ props }) => props ? "#C70000" : "#03AC00"};
    font-size: 17px;
    line-height: 20px;
    font-family: 'Raleway';
`;

const Options = styled.div`
    margin: 0 24px 16px 24px;
    display: flex;
    justify-content: space-between;
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
    border: none;
    &:hover {
        cursor: pointer;
    }
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    height: 85px;
    justify-content: space-between;
    padding: 10px 10px;
`;

const Text = styled.p`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    width: 50px;
    color: #FFFFFF;
    text-align: start;
`;

const PlusIcon = styled(AiOutlinePlusCircle)`
    font-size: 17px;
    color: #FFFFFF;
`;

const MinusIcon = styled(AiOutlineMinusCircle)`
    font-size: 17px;
    color: #FFFFFF;
`;
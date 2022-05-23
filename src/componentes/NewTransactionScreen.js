import { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import transactionContext from "./../contexts/transactionContext";
import TokenContext from "./../contexts/TokenContext";


function NewTransactionScreen() {
    const { profitOrSpent } = useContext(transactionContext);
    const { token } = useContext(TokenContext);
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const type = profitOrSpent === "profit" ? "entrada" : "saída";

    function saveTransaction(ev) {
        ev.preventDefault();
        
        axios.post("http://localhost:5000/transaction", 
            {
                value: profitOrSpent === "profit" ? value : -value,
                description: description
            },
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            }
        )
        .then(res => {
            alert(`Nova ${type} criada!`);
            navigate("/main");
        })
        .catch(error => {
            alert("Algo deu errado, tente novamente mais tarde");
        });
    }

    return (
        <Container>
            <H1>Nova {type}</H1>
            <Form onSubmit={ev => saveTransaction(ev)}>
                <Input placeholder="Valor" type="number" onChange={ev => setValue(ev.target.value)} value={value}></Input>
                <Input placeholder="Descrição" type="text" onChange={ev => setDescription(ev.target.value)} value={description}></Input>
                <Button type="submit">Salvar {type}</Button>
            </Form>
        </Container>);
}

export default NewTransactionScreen;

const Container = styled.main`
    width: 375px;
    background-color: #8C11BE;
    padding: 25px 24px;
    box-sizing: border-box;
    height: 100vh;
`;

const H1 = styled.h1`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    margin-bottom: 40px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 326px;
    height: 58px;
    padding-left: 10px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 5px;
    border: none;
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    margin-bottom: 13px;
`;

const Button = styled.button`
    width: 326px;
    height: 46px;
    background: #A328D6;
    border-radius: 5px;
    border: none;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
`;
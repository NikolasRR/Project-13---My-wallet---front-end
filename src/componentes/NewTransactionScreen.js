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
                headers: { Authorization: `Bearer ${token}` }
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
        <>
            <H1>Nova {type}</H1>
            <Form onSubmit={ev => saveTransaction(ev)}>
                <Input placeholder="Valor" type="number" onChange={ev => setValue(ev.target.value)} value={value}></Input>
                <Input placeholder="Descrição" type="text" onChange={ev => setDescription(ev.target.value)} value={description}></Input>
                <Button type="submit">Salvar {type}</Button>
            </Form>
        </>);
}

export default NewTransactionScreen;

const H1 = styled.h1`
`;

const Form = styled.form`
`;

const Input = styled.input`
`;

const Button = styled.button`
`;
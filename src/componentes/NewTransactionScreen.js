import { useState, useContext } from "react";
import styled from "styled-components";

import transactionContext from "./../contexts/transactionContext";

function NewTransactionScreen() {
    const { profitOrSpent, setProfitOrSpent } = useContext(transactionContext);
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");

    const type = profitOrSpent === "profit" ? "entrada" : "saída";

    function saveTransaction(ev) {
        ev.preventDefault();
    }

    return (
        <>
            <H1>Nova {type}</H1>
            <Form onSubmit={ev => saveTransaction(ev)}>
                <Input placeholder="Valor" onChange={ev => setValue(ev.target.value)} value={value}></Input>
                <Input placeholder="Descrição" onChange={ev => setDescription(ev.target.value)} value={description}></Input>
                <Button type="submit">Salvar {type}</Button>
            </Form>
        </>);
}

export default NewTransactionScreen;

const Form = styled.form`
`;

const Input = styled.input`
`;

const Button = styled.button`
`;
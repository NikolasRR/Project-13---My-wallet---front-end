import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";

import MyWallet from "./../assets/imgs/MyWallet.png";

function SignUpScreen () {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const { setToken } = useContext(TokenContext);


    const LogIn = function (ev) {
        ev.preventDefault();
        console.log("oi");
        const promisse = axios.post("http://localhost:5000/sign-up", 
        {
            name: name,
            email: email,
            password: password
        });
        promisse.then(serverAnswer => {
            setToken(serverAnswer.data.token);
            navigate("/main");
        });
        promisse.catch(error => {
            alert("Usuário ou senha incorretos");
        });
    }

    return (
        <Div>
            <img src={MyWallet} alt="logo" />
            <Form onSubmit={ev => LogIn(ev)}>
                <Input placeholder="Nome" value={name} onChange={ev => setName(ev.target.value)}></Input>
                <Input placeholder="E-mail" value={email} onChange={ev => setEmail(ev.target.value)}></Input>
                <Input placeholder="Senha" value={password} onChange={ev => setpassword(ev.target.value)}></Input>
                <Input placeholder="Confirme a senha" value={password} onChange={ev => setpassword(ev.target.value)}></Input>
                <Button type="submit">Cadastrar</Button>
            </Form>
            <StyledLink to="/sign-in">Já tem uma conta? Entre agora!</StyledLink>
        </Div>
    )
}

export default SignUpScreen;

const Div = styled.div`
    background-color: #A328D6;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 375px;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 326px;
`;

const Input = styled.input`
    width: 326px;
`;

const Button = styled.button`
    width: 326px;
`;

const StyledLink = styled(Link)`
`;
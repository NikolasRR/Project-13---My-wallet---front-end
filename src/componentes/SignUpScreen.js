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
    const [password1, setpassword1] = useState("");
    const [password2, setpassword2] = useState("");
    const { setToken } = useContext(TokenContext);


    const LogIn = function (ev) {
        ev.preventDefault();

        if (password1 !== password2) {
            alert("As senhas precisam ser iguais");
            return;
        }

        const promisse = axios.post("http://localhost:5000/sign-up", 
        {
            name: name,
            email: email,
            password: password1
        });
        promisse.then(res => {
            setToken(res.data.token);
            navigate("/main");
        });
        promisse.catch(error => {
            if (error.response.status === 409) {
                alert("E-mail já cadastrado");
                return;
            }
            alert("Ocorreu um erro");
        });
    }

    return (
        <Div>
            <img src={MyWallet} alt="logo" />
            <Form onSubmit={ev => LogIn(ev)}>
                <Input placeholder="Nome" value={name} onChange={ev => setName(ev.target.value)} type="text"></Input>
                <Input placeholder="E-mail" value={email} onChange={ev => setEmail(ev.target.value)} type="email"></Input>
                <Input placeholder="Senha" value={password1} onChange={ev => setpassword1(ev.target.value)} type="password"></Input>
                <Input placeholder="Confirme a senha" value={password2} onChange={ev => setpassword2(ev.target.value)} type="password"></Input>
                <Button type="submit">Cadastrar</Button>
            </Form>
            <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
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
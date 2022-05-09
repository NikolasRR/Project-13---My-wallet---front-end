import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";


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

        const promisse = axios.post("https://mywalletproject13.herokuapp.com/sign-up", 
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
            <H1>My Wallet</H1>
            <Form onSubmit={ev => LogIn(ev)}>
                <Input placeholder="  Nome" value={name} onChange={ev => setName(ev.target.value)} type="text"></Input>
                <Input placeholder="  E-mail" value={email} onChange={ev => setEmail(ev.target.value)} type="email"></Input>
                <Input placeholder="  Senha" value={password1} onChange={ev => setpassword1(ev.target.value)} type="password"></Input>
                <Input placeholder="  Confirme a senha" value={password2} onChange={ev => setpassword2(ev.target.value)} type="password"></Input>
                <Button type="submit">Cadastrar</Button>
            </Form>
            <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
        </Div>
    )
}

export default SignUpScreen;

const Div = styled.div`
    background-color: #8C11BE;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 375px;
    height: 100vh;
`;

const H1 = styled.h1`
    margin: 95px 0 24px 0;
    height: 50px;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    font-family: 'Saira Stencil One', cursive;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 326px;
`;

const Input = styled.input`
    width: 326px;
    height: 58px;
    border-radius: 5px;
    margin-bottom: 13px;
    border: none;
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    line-height: 23px;
`;

const Button = styled.button`
    width: 326px;
    height: 46px;
    border-radius: 5px;
    background-color: #A328D6;
    border: none;
    margin-bottom: 32px;
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
    font-weight: 700;
`;

const StyledLink = styled(Link)`
    color: #FFFFFF;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    text-decoration: none;
`;
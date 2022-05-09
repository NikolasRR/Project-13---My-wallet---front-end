import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";

function SignInScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const { setToken } = useContext(TokenContext);


    const LogIn = function (ev) {
        ev.preventDefault();
        
        const promisse = axios.post("http://localhost:5000/sign-in", 
        {
            email: email,
            password: password
        });
        promisse.then(res => {
            localStorage.setItem("userToken", JSON.stringify(res.data));
            setToken(res.data);
            navigate("/main");
        });
        promisse.catch(error => {
            alert("Usuário ou senha incorretos");
        });
    }

    return (
        <Div>
            <H1>My Wallet</H1>
            <Form onSubmit={ev => LogIn(ev)}>
                <Input placeholder="   E-mail" value={email} type="email" onChange={ev => setEmail(ev.target.value)}></Input>
                <Input placeholder="   Senha" value={password} type="password" onChange={ev => setpassword(ev.target.value)}></Input>
                <Button type="submit">Entrar</Button>
            </Form>
            <StyledLink to="/sign-up">Primeira vez? Cadastre-se!</StyledLink>
        </Div>
    )
}

export default SignInScreen;

const Div = styled.div`
    background-color: #8C11BE;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 375px;
    height: 100vh;
`;

const H1 = styled.h1`
    margin: 159px 0 24px 0;
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
    margin-bottom: 36px;
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
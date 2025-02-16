"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRegister } from "../context/RegisterContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: inline-block;
  line-height: 42px;
  background-color: #171717;
`;

const RegisterForm = () => {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, auth } = useAuth();
  const { addAccount } = useRegister();

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleNewAccount = () => {
    addAccount(login, email, password);
    auth();
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="register-form">
      <div>
        <input onChange={handleLogin} placeholder="Login" type="text" />
        <input onChange={handleEmail} placeholder="E-mail" type="text" />
        <input onChange={handlePassword} placeholder="Password" type="text" />
      </div>
      <div
        style={{
          display: "flex",
          width: "300px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button onClick={handleNewAccount}>Register</button>
        <StyledLink href="/login">
          <div
            style={{
              margin: "0",
              textAlign: "center",
              backgroundColor: "#ffffff",
              color: "#171717",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "backgroundColor 0.3s",
              width: "120px",
              fontSize: "15px",
              fontWeight: "300",
            }}
          >
            Have account?
          </div>
        </StyledLink>
      </div>
    </div>
  );
};

export default RegisterForm;

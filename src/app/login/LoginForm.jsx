"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useRegister } from "../context/RegisterContext";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: inline-block;
  line-height: 42px;
  background-color: #171717;
`;

const LoginForm = () => {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, auth } = useAuth();
  const { accounts } = useRegister();

  const [wrong, setWrong] = useState(false);

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleAccount = () => {
    const foundUser = accounts.find(
      (account) => account.login === login && account.password === password
    );
    if (foundUser) {
      auth(foundUser);
    } else {
      setWrong(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="login-form" style={{ height: "300px" }}>
      <div>
        <input onChange={handleLogin} placeholder="Login" type="text" />
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
        <button onClick={handleAccount}>Login</button>
        <StyledLink href="/register">
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
            No account?
          </div>
        </StyledLink>
      </div>

      {wrong ? <h1>Wrong password or login</h1> : <h1></h1>}
    </div>
  );
};

export default LoginForm;

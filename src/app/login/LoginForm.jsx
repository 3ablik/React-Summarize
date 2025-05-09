"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: inline-block;
  line-height: 42px;
`;

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="login-form">
      <h1 style={{ color: "#333" }}>Login</h1>
      <div>
        <input
          onChange={(e) => setLoginInput(e.target.value)}
          placeholder="Login"
          type="text"
        />
        <input
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Password"
          type="password"
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "300px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button
          onClick={() =>
            dispatch(login({ login: loginInput, password: passwordInput }))
          }
          className="bg-background"
        >
          Login
        </button>
        <StyledLink href="/register">
          <div className="register-link">No account?</div>
        </StyledLink>
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;

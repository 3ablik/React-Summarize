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
  background-color: #171717;
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
    <div className="login-form" style={{ height: "350px" }}>
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
        >
          Login
        </button>
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

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: inline-block;
  line-height: 42px;
`;

const RegisterForm = () => {
  const emailRegex =
    /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]+)\]))$/;

  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  console.log(isAuthenticated, error);

  const [loginInput, setLogin] = useState("");
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="login-form" style={{ height: "350px" }}>
      <h1 style={{ color: "#333" }}>Register</h1>
      <div>
        <input
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Login"
          type="text"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          type="text"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
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
            dispatch(
              register({
                login: loginInput,
                email: emailInput,
                password: passwordInput,
                cart: null,
              })
            )
          }
        >
          Register
        </button>
        <StyledLink href="/login">
          <div
            style={{
              margin: "0",
              textAlign: "center",
              backgroundColor: "#ffa500",
              color: "#ffffff",
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

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default RegisterForm;

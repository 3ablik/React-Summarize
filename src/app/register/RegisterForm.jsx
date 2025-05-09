import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import { sendEmail } from "../utils/sendEmail";

const StyledLink = styled(Link)`
  display: inline-block;
  line-height: 42px;
`;

const RegisterForm = () => {
  const emailRegex =
    /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]+)\]))$/;
  // Regex for validating email format (RFC 5322 compliant)
  // Выпендриваться же надо

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?])[^\s]{6,}$/;
  // Requires at least one uppercase letter, one special character, no spaces, and a minimum of 6 characters

  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  console.log(isAuthenticated, error);

  const [loginInput, setLogin] = useState("");
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState([]);

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [isValidAccount, setIsValidAccount] = useState(false);

  const clearError = () => {
    setErrorMessage([]);
  };
  useEffect(() => {
    setIsValidAccount(isValidEmail && isValidPassword && loginInput.length > 0);
  }, [isValidEmail, isValidPassword, loginInput]);

  useEffect(() => {
    if (error && !errorMessage.includes(error)) {
      setErrorMessage((prev) => [...prev, error]);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      sendEmail(loginInput, emailInput)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
        });

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
          onBlur={(e) => {
            if (!emailRegex.test(e.target.value)) {
              setIsValidEmail(false);
              setErrorMessage((prev) => {
                if (prev.includes("Please enter a valid email address")) {
                  return prev;
                } else {
                  return [...prev, "Please enter a valid email address"];
                }
              });
            } else if (emailRegex.test(e.target.value)) {
              setIsValidEmail(true);
              setErrorMessage((prev) => {
                return prev.filter(
                  (el) => el !== "Please enter a valid email address"
                );
              });
            }
          }}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          onBlur={(e) => {
            if (!passwordRegex.test(e.target.value)) {
              setIsValidPassword(false);
              setErrorMessage((prev) => {
                if (
                  prev.includes(
                    "The password must contain at least one uppercase letter and a special character, and must not contain spaces"
                  )
                ) {
                  return prev;
                } else {
                  return [
                    ...prev,
                    "The password must contain at least one uppercase letter and a special character, and must not contain spaces",
                  ];
                }
              });
            } else if (passwordRegex.test(e.target.value)) {
              setIsValidPassword(true);
              setErrorMessage((prev) => {
                return prev.filter(
                  (el) =>
                    el !==
                    "The password must contain at least one uppercase letter and a special character, and must not contain spaces"
                );
              });
            }
          }}
        />
      </div>
      <div className="flex flex-col">
        {errorMessage.map((error, index) => (
          <p key={index} style={{ color: "red", alignSelf: "left" }}>
            {error}
          </p>
        ))}
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
          onClick={() => {
            if (isValidAccount) {
              clearError();
              dispatch(
                register({
                  login: loginInput,
                  email: emailInput,
                  password: passwordInput,
                  cart: null,
                })
              );
            } else {
              setErrorMessage((prev) => {
                if (prev.includes("Please fill in all fields")) {
                  return prev;
                } else {
                  return [...prev, "Please fill in all fields"];
                }
              });
            }
          }}
          className={
            isValidAccount ? "bg-background hover:bg-background" : "bg-gray-300"
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
    </div>
  );
};

export default RegisterForm;

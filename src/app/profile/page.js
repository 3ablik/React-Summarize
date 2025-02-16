"use client";
import React from "react";
import { useRegister } from "../context/RegisterContext";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: inline-block;
  line-height: 42px;
  margin: 0;
  text-align: center;
  background-color: #ffffff;
  color: #171717;
  border: 3px solid #171717;
  border-radius: 4px;
  cursor: pointer;
  transition: backgroundColor 0.3s;
  width: 120px;
  font-size: 15px;
  font-weight: 300;
`;

const Profile = () => {
  const { userReg } = useRegister();
  const { isAuthenticated, userAuth, setIsAuthenticated } = useAuth();

  userAuth ? console.log(userAuth.login) : console.log(userReg.name);

  return (
    <div>
      <h1>Profile</h1>
      {isAuthenticated ? (
        <div>
          {userAuth ? (
            <div>
              <h3>Login: {userAuth.login}</h3>
              <h3>Email: {userAuth.email}</h3>
            </div>
          ) : (
            <div>
              <h3>Login: {userReg.login}</h3>
              <h3>Email: {userReg.email}</h3>
            </div>
          )}
          <button
            onClick={() => {
              setIsAuthenticated(false);
            }}
            style={{ backgroundColor: "red" }}
          >
            Exit
          </button>
        </div>
      ) : (
        <div>
          <StyledLink href="/login">Maybe sign in?</StyledLink>
        </div>
      )}
    </div>
  );
};

export default Profile;

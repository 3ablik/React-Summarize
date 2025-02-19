"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearCart } from "../store/slices/authSlice";
import Link from "next/link";
import styled from "styled-components";
import PizzasList from "../components/pizzas/PizzasList";
import Modal from "../components/Modal/Modal";
import { useRouter } from "next/navigation";

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
  const dispatch = useDispatch();
  const { isAuthenticated, userAuth } = useSelector((state) => state.auth);
  console.log(userAuth, isAuthenticated);

  const router = useRouter();

  const [selectedPizza, setSelectedPizza] = useState();

  return (
    <div>
      <h1
        style={{
          color: "white",
        }}
      >
        Profile
      </h1>
      {isAuthenticated ? (
        <div>
          <h3
            style={{
              color: "white",
            }}
          >
            Login: {userAuth.login}
          </h3>
          <h3
            style={{
              color: "white",
            }}
          >
            Email: {userAuth.email}
          </h3>
          <button
            onClick={() => dispatch(logout())}
            style={{ backgroundColor: "red", color: "#fff" }}
          >
            Exit
          </button>
          <main>
            <div>
              <PizzasList
                onSelectPizza={setSelectedPizza}
                url_api={null}
                pizzasList={userAuth.cart}
              />
              {selectedPizza && (
                <Modal
                  pizza={selectedPizza}
                  onClose={() => setSelectedPizza(null)}
                />
              )}
            </div>
          </main>
          {userAuth.cart.length > 0 ? (
            <button
              onClick={() => {
                dispatch(clearCart({ user: userAuth }));
              }}
            >
              Buy All!
            </button>
          ) : (
            <button
              onClick={() => {
                router.push("/");
              }}
            >
              Go Shopping!
            </button>
          )}
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

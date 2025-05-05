"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import { clearCart } from "../store/slices/authSlice";
import PizzasList from "../components/pizzas/PizzasList";
import Modal from "../components/Modal/Modal";

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

const Cart = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userAuth } = useSelector((state) => state.auth);
  console.log(userAuth, isAuthenticated);

  const router = useRouter();

  const [selectedPizza, setSelectedPizza] = useState();
  return (
    <>
      {isAuthenticated ? (
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
          <div className="profile-buttons">
            {userAuth.cart.length > 0 ? (
              <button
                onClick={() => {
                  dispatch(clearCart({ user: userAuth }));
                }}
                className="buy-button"
              >
                Buy All!
              </button>
            ) : (
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="shop-button"
              >
                Go Shopping!
              </button>
            )}
          </div>
        </main>
      ) : (
        <div style={{ textAlign: "center" }}>
          <StyledLink href="/login">Maybe sign in?</StyledLink>
        </div>
      )}
    </>
  );
};

export default Cart;

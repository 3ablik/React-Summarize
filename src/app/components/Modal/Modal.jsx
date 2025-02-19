"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Прикольная штука
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/slices/authSlice";

function Modal({ pizza, onClose }) {
  const { isAuthenticated, userAuth } = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  console.log(userAuth);

  const router = useRouter();

  const location = window.location.pathname;

  const dispatch = useDispatch();
  const [rotation, setRotation] = useState(0);
  const [isClickedButton, setIsClickedButton] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClickImg = () => {
    setRotation((prev) => prev - 45);
    setTimeout(() => {
      setRotation((prev) => prev + 405);
    }, 500);
  };
  const handleAnimationButton = () => {
    setIsClickedButton(true);
  };
  const handleLoginClick = () => {
    router.push("/login");
  };

  if (location === "/profile") {
    useEffect(() => {
      const existingPizza = userAuth.cart.find((p) => p.id === pizza.id);
      if (!existingPizza) {
        onClose(); // Закрываем модалку, если пиццы нет в корзине
      }
    }, [userAuth.cart, pizza.id, onClose]);
  }

  return (
    <div
      id="modal-background"
      onClick={(e) => e.target.id === "modal-background" && onClose()}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: 800,
          height: 500,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 800,
            height: 500,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <motion.img
            src={pizza.img}
            alt={pizza.name}
            width="400"
            height="400"
            animate={isClickedButton && { rotate: 8280 }}
            transition={{
              duration: 10,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: 400,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <p style={{ fontSize: "30px", color: "#ffa500" }}>
                  {pizza.name}
                </p>
                <motion.img
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/85660296-acca-4492-8da3-2d8458a3676a/dg3noa4-6588450b-3485-4f2d-9570-5b7c4e9c563e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg1NjYwMjk2LWFjY2EtNDQ5Mi04ZGEzLTJkODQ1OGEzNjc2YVwvZGczbm9hNC02NTg4NDUwYi0zNDg1LTRmMmQtOTU3MC01YjdjNGU5YzU2M2UucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.PbjHwx2RqKDiercrRuasVdq2Q6RGLRWligRuMpfapwE"
                  animate={{ rotate: rotation }}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                  onClick={handleClickImg}
                  style={{ cursor: "pointer", width: 40 }}
                />
              </div>
              <p style={{ fontSize: "15px", width: "300px" }}>
                Ingredients: Cheese, random staff and other. Lorem ipsum dolor
                sit amet consectetur
              </p>
            </div>
            <div>
              <br />
              <p style={{ fontSize: "20px", color: "#ffa500", width: "300px" }}>
                Produced in: {pizza.country}
              </p>
              <p style={{ fontSize: "20px", color: "#ffa500", width: "300px" }}>
                Rating: {pizza.rate}
              </p>
              <p style={{ fontSize: "20px", color: "#ffa500", width: "300px" }}>
                Price: {pizza.price}$
              </p>
            </div>
            <input
              style={{
                width: "300px",
                height: "50px",
                fontSize: "20px",
                marginTop: "20px",
              }}
              placeholder="Any special requests?"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              value={inputValue}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  setInputValue("");
                }
              }}
            />
            {location === "/profile" ? (
              <button
                style={{
                  width: "300px",
                  height: "50px",
                  fontSize: "20px",
                  marginTop: "20px",
                }}
                onClick={() => {
                  dispatch(
                    removeFromCart({
                      pizza: {
                        ...pizza,
                      },
                      user: userAuth,
                    })
                  );
                }}
              >
                Remove from basket
              </button>
            ) : (
              <button
                style={{
                  width: "300px",
                  height: "50px",
                  fontSize: "20px",
                  marginTop: "20px",
                }}
                onClick={() => handleAnimationButton()}
              >
                {isClickedButton ? "No more animation" : "Click for animation"}
              </button>
            )}
            <button
              style={{
                width: "300px",
                height: "50px",
                fontSize: "20px",
                marginTop: "20px",
              }}
              onClick={
                isAuthenticated
                  ? () => {
                      dispatch(
                        addToCart({
                          pizza: {
                            ...pizza,
                            specialRequest: inputValue,
                          },
                          user: userAuth,
                        })
                      );
                    }
                  : () => handleLoginClick()
              }
            >
              {isAuthenticated
                ? `Add to basket for ${pizza.price}$`
                : "Maybe Log In?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addToCart,
  removeFromCart,
  toggleFavorite,
} from "../../store/slices/authSlice";
import { deleteProduct } from "@/app/store/thunks/productsThunks";
import notFav from "../images/notFav.png";
import fav from "../images/fav.png";

function Modal({ pizza, onClose }) {
  const { isAuthenticated, userAuth } = useSelector((state) => state.auth);
  const role = userAuth?.role || "guest";
  const router = useRouter();
  const location = window.location.pathname;

  const dispatch = useDispatch();
  const [rotation, setRotation] = useState(0);
  const [isClickedButton, setIsClickedButton] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isFavorite = userAuth?.favorites?.some((p) => p.id === pizza.id);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite({ pizza }));
  };

  const handleClickImg = () => {
    setRotation((prev) => prev - 45);
    setTimeout(() => {
      setRotation((prev) => prev + 405);
    }, 500);
  };

  const handleLoginClick = () => router.push("/login");

  if (location === "/cart") {
    useEffect(() => {
      const existingPizza = userAuth.cart.find((p) => p.id === pizza.id);
      if (!existingPizza) onClose();
    }, [userAuth.cart, pizza.id, onClose]);
  }

  return (
    <div
      id="modal-background"
      onClick={(e) => e.target.id === "modal-background" && onClose()}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-6 w-full max-w-4xl h-3/6  flex flex-row gap-6  max-lg:h-[70%]  max-lg:max-w-[70%]  max-[850px]:flex-col max-[850px]:h-[90%] max-[850px]:gap-2 max-[850px]:items-center max-[850px]:justify-around"
      >
        <motion.img
          key={isClickedButton ? "animate" : "reset"}
          src={pizza.img}
          alt={pizza.name}
          className="w-50%  max-[850px]:max-w-[70%] max-[850px]:max-h-[100%] max-md:max-w-[90%]  max-sm:max-w-[225px]"
          animate={isClickedButton ? { rotate: 8280 } : { rotate: 0 }}
          transition={{ duration: 10 }}
        />
        <div className="flex flex-col items-center justify-between w-[60%] max-[850px]:w-full max-[850px]:flex-row  max-[440px]:flex-col">
          <div className="w-full flex flex-col gap-4  max-lg:gap-0  max-[850px]:w-[45%]  max-md:justify-between">
            <div className="flex justify-between items-baseline  max-[850px]:flex-row-reverse max-[850px]:justify-end max-[850px]:gap-2">
              <p className="text-2xl text-orange-500 font-semibold  max-lg:text-lg">
                {pizza.name}
              </p>
              <motion.img
                src={isFavorite ? fav.src : notFav.src}
                animate={{ rotate: rotation }}
                transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
                onClick={() => {
                  handleClickImg();
                  handleFavoriteClick();
                }}
                className="w-8 cursor-pointer max-[850px]:w-5"
              />
            </div>
            <p className="text-sm text-gray-600 max-w-md  max-lg:text-xs">
              Ingredients: Cheese, random staff and other. Lorem ipsum dolor sit
              amet consectetur
            </p>

            <div className="text-lg text-orange-500  max-lg:text-sm">
              <p>Produced in: {pizza.country}</p>
              <p>Rating: {pizza.rate}</p>
              <p>
                Price:{" "}
                {role === "worker" ? (
                  <>
                    <span>{Math.floor(pizza.price / 2)}$</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {pizza.price}$
                    </span>
                  </>
                ) : (
                  <span>{pizza.price}$</span>
                )}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-between max-[850px]:max-w-[45%]">
            {role !== "admin" && (
              <input
                className="w-full max-w-md h-10 text-lg mt-4 px-3 border-2 border-gray-300 rounded  max-[850px]:h-10"
                placeholder="Any special requests?"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setInputValue("");
                }}
              />
            )}

            {location === "/cart" ? (
              <button
                className="w-full max-w-md h-10 text-lg mt-4 bg-red-500 text-white rounded  max-lg:text-sm  max-[850px]:h-10 max-[850px]:"
                onClick={() => {
                  dispatch(
                    removeFromCart({ pizza: { ...pizza }, user: userAuth })
                  );
                  toast.success("Pizza was removed from cart 🍕");
                }}
              >
                Remove from basket
              </button>
            ) : (
              <button
                className="w-full max-w-md h-10 text-lg mt-4 bg-blue-400 text-white rounded   max-lg:text-sm  max-[850px]:h-10 max-[850px]:"
                onClick={() => {
                  if (isClickedButton) {
                    setIsClickedButton(false);
                  } else {
                    setIsClickedButton(true);
                  }
                }}
              >
                {isClickedButton ? "Again?" : "Click for animation"}
              </button>
            )}

            <button
              className="w-full max-w-md h-10 text-lg mt-4 bg-green-500 text-white rounded  max-lg:text-sm  max-[850px]:h-10 max-[850px]:"
              onClick={() => {
                if (isAuthenticated) {
                  if (role === "admin") {
                    dispatch(deleteProduct(pizza.id));
                    onClose();
                  } else {
                    dispatch(
                      addToCart({
                        pizza: { ...pizza, specialRequest: inputValue },
                        user: userAuth,
                      })
                    );
                    toast.success("Pizza was added to cart 🍕");
                  }
                } else {
                  handleLoginClick();
                }
              }}
            >
              {isAuthenticated
                ? role === "admin"
                  ? "Delete"
                  : role === "worker"
                  ? `Add to basket for ${Math.floor(pizza.price / 2)}$`
                  : `Add to basket for ${pizza.price}$`
                : "Maybe Log In?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

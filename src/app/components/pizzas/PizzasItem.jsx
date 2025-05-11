"use client";
import React from "react";
import { useSelector } from "react-redux";

const PizzasItem = ({ pizza, onSelectPizza }) => {
  const { isAuthenticated, userAuth } = useSelector((state) => state.auth);
  const role = userAuth?.role || "guest";
  const isWorker = role === "worker";

  const discountedPrice = isWorker
    ? Math.floor(pizza.price * 0.5)
    : pizza.price;
  return (
    <div
      className="pizza-item"
      key={pizza.id}
      onClick={() => onSelectPizza(pizza)}
    >
      <img src={pizza.img} alt={pizza.name} className="h-[266.4px]" />
      <div className="flex flex-col justify-between h-[115px]">
        <div className="flex flex-col">
          <h2>{pizza.name}</h2>
          <p className="description">{pizza.dsc}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="price">
            {discountedPrice}$
            {isWorker && (
              <span
                style={{ textDecorationThickness: "2px" }}
                className="text-sm text-gray-500 line-through ml-2"
              >
                {pizza.price}$
              </span>
            )}
          </p>
          {pizza.quantity && <p style={{ color: "black" }}>{pizza.quantity}</p>}
        </div>
      </div>
    </div>
  );
};

export default PizzasItem;

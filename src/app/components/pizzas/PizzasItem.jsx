"use client";
import React from "react";

const PizzasItem = ({ pizza, onSelectPizza }) => {
  return (
    <div
      className="pizza-item"
      key={pizza.id}
      onClick={() => onSelectPizza(pizza)}
    >
      <img src={pizza.img} alt={pizza.name} />
      <h2>{pizza.name}</h2>
      <div>
        <p>{pizza.dsc}</p>
        <p>{pizza.price}$</p>
      </div>
    </div>
  );
};

export default PizzasItem;

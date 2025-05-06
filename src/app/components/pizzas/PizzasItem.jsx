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
      <div className="flex flex-col justify-between h-[115px]">
        <div className="flex flex-col">
          <h2>{pizza.name}</h2>
          <p className="description">{pizza.dsc}</p>
        </div>
        <p className="price">{pizza.price}$</p>
      </div>
    </div>
  );
};

export default PizzasItem;

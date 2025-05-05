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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: 75,
          justifyContent: "space-between",
        }}
      >
        <p className="description">{pizza.dsc}</p>
        <p className="price">{pizza.price}$</p>
      </div>
    </div>
  );
};

export default PizzasItem;

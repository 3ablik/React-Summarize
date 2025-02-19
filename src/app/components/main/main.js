"use client";
import React, { useState } from "react";
import PizzasList from "../pizzas/PizzasList";
import Modal from "../Modal/Modal";

export default function Main() {
  const [selectedPizza, setSelectedPizza] = useState();
  const url_api = "https://free-food-menus-api-two.vercel.app/pizzas";
  return (
    <main>
      <div>
        <PizzasList
          onSelectPizza={setSelectedPizza}
          url_api={url_api}
          pizzasList={null}
        />
        {selectedPizza && (
          <Modal pizza={selectedPizza} onClose={() => setSelectedPizza(null)} />
        )}
      </div>
    </main>
  );
}

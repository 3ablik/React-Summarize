"use client";
import React, { useState } from "react";
import PizzasList from "../pizzas/PizzasList";
import Modal from "../Modal/Modal";

export default function Main() {
  const [selectedPizza, setSelectedPizza] = useState();

  return (
    <main>
      <div>
        <PizzasList onSelectPizza={setSelectedPizza} />
        {selectedPizza && (
          <Modal pizza={selectedPizza} onClose={() => setSelectedPizza(null)} />
        )}
      </div>
    </main>
  );
}

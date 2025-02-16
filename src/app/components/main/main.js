"use client";
import React, { useState } from "react";
import PizzasList from "../pizzas/PizzasList";
import Modal from "../Modal/Modal";
import { useAuth } from "../../context/AuthContext";
import { useRegister } from "@/app/context/RegisterContext";

export default function Main() {
  const { isAuthenticated, userAuth } = useAuth();
  const { accounts, userReg } = useRegister();
  console.log(accounts, userReg);
  console.log(accounts, userAuth);

  const [selectedPizza, setSelectedPizza] = useState();

  return (
    <main>
      <div>
        <PizzasList onSelectPizza={setSelectedPizza} />
        {selectedPizza && (
          <Modal
            pizza={selectedPizza}
            onClose={() => setSelectedPizza(null)}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>
    </main>
  );
}

"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PizzasList from "../pizzas/PizzasList";
import Modal from "../Modal/Modal";
import AdminModal from "../Modal/AdminModal";
import AdminNewPizzaModal from "../Modal/AdminNewPizzaModal";

export default function Main() {
  const [selectedPizza, setSelectedPizza] = useState();
  const [newPizzaModal, setNewPizzaModal] = useState(false); //newPizza
  const url_api = "https://67f55318913986b16fa42b4b.mockapi.io/pizzas";
  const { isAuthenticated, userAuth } = useSelector((state) => state.auth);
  const role = userAuth?.role || "guest";
  console.log(role, "Main");

  return (
    <main>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <PizzasList
          onSelectPizza={setSelectedPizza}
          onNewPizza={setNewPizzaModal}
          url_api={url_api}
          pizzasList={null}
        />
        {selectedPizza &&
          (role === "admin" ? (
            <AdminModal
              pizza={selectedPizza}
              onClose={() => setSelectedPizza(null)}
            />
          ) : (
            <Modal
              pizza={selectedPizza}
              onClose={() => setSelectedPizza(null)}
            />
          ))}
        {newPizzaModal && (
          <AdminNewPizzaModal onClose={() => setNewPizzaModal(false)} />
        )}
      </div>
    </main>
  );
}

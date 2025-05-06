import axios from "axios";
import PizzasItem from "./PizzasItem";
import React, { useState, useEffect } from "react";
import { usePizzas } from "../hooks/usePizzas";

const PizzasList = ({ onSelectPizza, pizzasList, url_api }) => {
  const [pizzas, setPizzas] = useState([]);
  const [pizzasFound, setPizzasFound] = useState("");

  useEffect(() => {
    if (pizzasList && pizzasList.length > 0) {
      setPizzas(pizzasList);
      setPizzasFound("Here is your cart :)");
    } else if (url_api) {
      async function getPizzas() {
        try {
          const response = await axios.get(url_api);
          const foundPizza = await Promise.all(
            response.data.map(async (pizza) => {
              try {
                await axios.head(pizza.img);
                return pizza;
              } catch {
                return null;
              }
            })
          );
          console.log(foundPizza, "foundPizza");

          const filteredPizzas = foundPizza.filter(Boolean);
          setPizzas(filteredPizzas);
          setPizzasFound(
            filteredPizzas.length > 0 ? "Menu" : "There is no pizzas :("
          );
        } catch (error) {
          console.error("Error fetching pizzas:", error);
          setPizzasFound("Failed to load pizzas.");
        }
      }
      getPizzas();
    } else {
      setPizzas([]);
      setPizzasFound("There is no pizzas :(");
    }
  }, [pizzasList, url_api]);

  const [select, setSelect] = useState("");
  const [search, setSearch] = useState("");
  const filteredAndSortedPizzas = usePizzas(search, select, pizzas);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      className="w-[90%]"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px",
          alignItems: "center",
          width: 1070,
        }}
      >
        <input
          className="h-35 border-3 border-black w-200 bg-white text-black"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p style={{ color: "black", fontSize: 40 }}>{pizzasFound}</p>
        <select
          className="h-35 border-3 border-black w-200 bg-white"
          value={select}
          onChange={(e) => setSelect(e.target.value)}
        >
          <option disabled value="">
            Sort
          </option>
          <option value="dsc">By description</option>
          <option value="name">By name</option>
        </select>
      </div>
      <div className="pizza-list">
        {filteredAndSortedPizzas.map((pizza) => (
          <div key={pizza.id || pizza.name}>
            <PizzasItem pizza={pizza} onSelectPizza={onSelectPizza} />
            {pizza.quantity && (
              <p style={{ color: "black" }}>Quantity: {pizza.quantity}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzasList;

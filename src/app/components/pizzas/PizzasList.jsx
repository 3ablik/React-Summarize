import axios from "axios";
import PizzasItem from "./PizzasItem";
import React, { useState, useEffect } from "react";
import { usePizzas } from "../hooks/usePizzas";
import { useAuth } from "../../context/AuthContext";
import { useRegister } from "@/app/context/RegisterContext";

const PizzasList = ({ onSelectPizza }) => {
  const { isAuthenticated, userAuth } = useAuth();
  const { accounts, userReg } = useRegister();
  console.log(isAuthenticated);
  console.log(accounts, userReg);
  console.log(accounts, userAuth);

  const [pizzas, setPizzas] = useState([]);
  const url_api = "https://free-food-menus-api-two.vercel.app/pizzas";
  useEffect(() => {
    async function getPizzas() {
      const response = await axios.get(url_api);

      const foundPizza = await Promise.all(
        // Обратился к gpt за функциями так как некоторые картины не грузились.
        response.data.map(async (pizza) => {
          try {
            // Если найдена картина, то пропускат
            await axios.head(pizza.img);
            return pizza;
          } catch {
            // null
            return null;
          }
        })
      );
      setPizzas(foundPizza.filter(Boolean)); // Фильтруем null-значения
    }
    getPizzas();
  }, []);

  const [select, setSelect] = useState("");
  const [search, setSearch] = useState("");
  const filteredAndSortedPizzas = usePizzas(search, select, pizzas);
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "35%",
          justifyContent: "center",
          padding: "20px",
          alignItems: "center",
        }}
      >
        <input
          style={{
            height: "35px",
            border: "3px solid black",
            width: "200px",
          }}
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <p style={{ color: "black", fontSize: 40 }}>Menu</p>
        <select
          style={{
            height: "35px",
            border: "3px solid black",
            width: "200px",
          }}
          value={select}
          onChange={(e) => {
            setSelect(e.target.value);
            console.log(select);
          }}
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
          <PizzasItem
            key={pizza.id || pizza.name}
            pizza={pizza}
            onSelectPizza={onSelectPizza}
          />
        ))}
      </div>
    </div>
  );
};

export default PizzasList;

import axios from "axios";
import PizzasItem from "./PizzasItem";
import React, { useState, useEffect } from "react";
import { usePizzas } from "../hooks/usePizzas";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const PizzasList = ({ onSelectPizza, pizzasList, url_api, onNewPizza }) => {
  const [pizzas, setPizzas] = useState([]);
  const [pizzasFound, setPizzasFound] = useState("");
  const [rotation, setRotation] = useState(0);

  const { userAuth } = useSelector((state) => state.auth);
  const role = userAuth?.role || "guest";

  const location = window.location.pathname;

  const handleClickImg = () => {
    setRotation((prev) => prev - 45);
    setTimeout(() => {
      setRotation((prev) => prev + 405);
    }, 500);
  };
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
  useEffect(() => {
    if (pizzasList && pizzasList.length > 0) {
      setPizzas(pizzasList);
      setPizzasFound("Here is your pizzas :)");
    } else if (url_api) {
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
          padding: "20px",
          alignItems: "center",
          maxWidth: 1070,
          gap: 20,
        }}
        className="w-[80%] justify-around max-sm:justify-between max-sm:w-full"
      >
        <input
          className="h-35 border-3 border-black w-200 bg-white text-black w-24 max-md:w-16"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p
          className=" text-5xl max-lg:text-3xl max-md:text-2xl max-sm:hidden"
          style={{ color: "black" }}
        >
          {pizzasFound}
        </p>
        <select
          className="h-35 border-3 border-black w-200 bg-white w-24 max-md:w-16"
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
      {location === "/" && (
        <div className="flex w-[85%] flex-col m-auto">
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/7022/7022719.png"
            animate={{ rotate: rotation }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            onClick={() => {
              getPizzas();
              handleClickImg();
            }}
            style={{ cursor: "pointer", width: 40 }}
            className=" self-end"
          />
        </div>
      )}
      <div className="pizza-list">
        {filteredAndSortedPizzas.map((pizza) => (
          <div key={pizza.id || pizza.name}>
            <PizzasItem pizza={pizza} onSelectPizza={onSelectPizza} />
          </div>
        ))}
        {role === "admin" && location === "/" && (
          <div
            className="flex flex-col justify-center items-center h-[415px] w-[300px] bg-gray-100"
            onClick={() => onNewPizza(true)}
          >
            <div className="w-[120px] h-[120px] bg-gray-200 opacity-70 rounded-full flex justify-center items-center">
              <h2 className="text-[80px] text-white">+</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PizzasList;

import { useMemo } from "react";

export const usePizzas = (search, select, pizzas) => {
  console.log(pizzas);

  return useMemo(() => {
    let newPizzas = pizzas;
    if (select) {
      newPizzas = newPizzas.sort((a, b) => {
        console.log(a[select], b[select], "select");

        return String(a[select]).localeCompare(String(b[select]));
      });
    }
    if (search.length > 0) {
      newPizzas = newPizzas.filter((pizza) => {
        return (
          pizza.name.toLowerCase().includes(search.toLowerCase()) ||
          pizza.dsc.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    return newPizzas;
  }, [search, select, pizzas]);
};

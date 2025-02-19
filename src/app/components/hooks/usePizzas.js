import { useMemo } from "react";

export const usePizzas = (search, select, pizzas) => {
  return useMemo(() => {
    if (pizzas == undefined) {
      console.log(pizzas);
      return [];
    }

    let newPizzas = [...pizzas];
    if (select) {
      newPizzas.sort((a, b) => {
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

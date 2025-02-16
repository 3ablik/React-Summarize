import { useMemo } from "react";

export const useBooks = (search, select, books) => {
  return useMemo(() => {
    let newBooks = books;
    if (select) {
      newBooks = newBooks.sort((a, b) => {
        console.log(a[select], b[select], "select");

        return String(a[select]).localeCompare(String(b[select]));
      });
    }
    if (search.length > 0) {
      newBooks = newBooks.filter((book) => {
        return (
          book.name.toLowerCase().includes(search.toLowerCase()) ||
          book.description.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    return newBooks;
  }, [search, select, books]);
};

import React, { useState } from "react";
import Slider from "../slider/Slider";
import BooksList from "../books/BooksList";
import BooksForm from "../books/BooksForm";
import { useBooks } from "../hooks/useBooks";
import { useAuth } from "../../context/AuthContext";
import { useRegister } from "@/app/context/RegisterContext";

export default function Main() {
  const { isAuthenticated, userAuth } = useAuth();
  const { accounts, userReg } = useRegister();
  console.log(isAuthenticated);
  console.log(accounts, userReg);
  console.log(accounts, userAuth);

  const [books, setBooks] = useState([
    {
      name: "Harry Potter and the Sorcerer's Stone",
      description:
        "The first book in the series, where Harry discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.",
      releaseDate: "1997-06-26",
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg/220px-Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
      author: "J.K. Rowling",
      price: "19.99$",
      isOpen: false,
      id: 0,
    },
    {
      name: "Harry Potter and the Chamber of Secrets",
      description:
        "Harry returns to Hogwarts and uncovers the mystery of the Chamber of Secrets, facing a deadly monster.",
      releaseDate: "1998-07-02",
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Harry_Potter_and_the_Chamber_of_Secrets.jpg/220px-Harry_Potter_and_the_Chamber_of_Secrets.jpg",
      author: "J.K. Rowling",
      price: "21.99$",
      isOpen: false,
      id: 1,
    },
    {
      name: "Harry Potter and the Prisoner of Azkaban",
      description:
        "Harry learns about Sirius Black, an escaped prisoner who may have ties to his past.",
      releaseDate: "1999-07-08",
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Harry_Potter_and_the_Prisoner_of_Azkaban.jpg/220px-Harry_Potter_and_the_Prisoner_of_Azkaban.jpg",
      author: "J.K. Rowling",
      price: "22.99$",
      isOpen: false,
      id: 2,
    },
    {
      name: "Harry Potter and the Goblet of Fire",
      description:
        "Harry unexpectedly enters the dangerous Triwizard Tournament and faces growing threats from Voldemort.",
      releaseDate: "2000-07-08",
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Harry_Potter_and_the_Goblet_of_Fire_cover.png/220px-Harry_Potter_and_the_Goblet_of_Fire_cover.png",
      author: "J.K. Rowling",
      price: "24.99$",
      isOpen: false,
      id: 3,
    },
    {
      name: "Harry Potter and the Order of the Phoenix",
      description:
        "Harry and his friends form Dumbledore’s Army as they fight against the tyranny of Dolores Umbridge and prepare for war.",
      releaseDate: "2003-06-21",
      src: "https://upload.wikimedia.org/wikipedia/en/7/70/Harry_Potter_and_the_Order_of_the_Phoenix.jpg",
      author: "J.K. Rowling",
      price: "25.99$",
      isOpen: false,
      id: 4,
    },
    {
      name: "Harry Potter and the Half-Blood Prince",
      description:
        "Harry learns more about Voldemort’s past and the secrets of Horcruxes while dealing with the challenges of growing up.",
      releaseDate: "2005-07-16",
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Harry_Potter_and_the_Half-Blood_Prince_cover.png/220px-Harry_Potter_and_the_Half-Blood_Prince_cover.png",
      author: "J.K. Rowling",
      price: "26.99$",
      isOpen: false,
      id: 5,
    },
    {
      name: "Harry Potter and the Deathly Hallows",
      description:
        "Harry, Ron, and Hermione go on a dangerous journey to destroy Voldemort’s Horcruxes and end the war between good and evil.",
      releaseDate: "2007-07-21",
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Harry_Potter_and_the_Deathly_Hallows.jpg/220px-Harry_Potter_and_the_Deathly_Hallows.jpg",
      author: "J.K. Rowling",
      price: "29.99$",
      isOpen: false,
      id: 6,
    },
  ]);

  const sliderData = [
    {
      name: "Harry Potter in Hogwarts",
      src: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/11/november-14-will-be-a-magical-day-for-harry-potter-fans.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
      index: 0,
    },
    {
      name: "Harry Potter still in Hogwarts",
      src: "https://www.afisha.uz/uploads/media/2023/04/361e5fe5da240eee2989ca155c54e005.jpg",
      index: 1,
    },
    {
      name: "Harry Potter destroyed Voldemort",
      src: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/07/collage-of-harry-potter-and-lord-voldemort-dueling-in-deathly-hallows-part-2-1.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
      index: 2,
    },
  ];
  const [sliderIndex, setSliderIndex] = useState(0);

  const handleSlider = (direction) => {
    if (direction === "left") {
      if (sliderIndex === 0) {
        setSliderIndex(sliderData.length - 1);
        console.log(sliderIndex);

        return;
      } else {
        setSliderIndex(sliderIndex - 1);
        console.log(sliderIndex);
        return;
      }
    } else if (direction === "right") {
      if (sliderIndex === sliderData.length - 1) {
        setSliderIndex(0);
        console.log(sliderIndex);
        return;
      } else {
        setSliderIndex(sliderIndex + 1);
        console.log(sliderIndex);
        return;
      }
    }
  };

  const handleIsOpen = (bookName) => {
    setBooks(
      books.map((book) =>
        book.name === bookName ? { ...book, isOpen: !book.isOpen } : book
      )
    );
  };

  const [select, setSelect] = useState("");
  const [search, setSearch] = useState("");
  const filteredAndSortedBooks = useBooks(search, select, books);

  console.log(filteredAndSortedBooks);
  console.log(books);

  return (
    <main>
      <h1>Books</h1>
      <div>
        <BooksForm setBooks={setBooks} />
      </div>
      <div
        style={{
          display: "flex",
          width: "1210px",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{ height: "35px", border: "3px solid black", width: "200px" }}
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <select
          style={{ height: "35px" }}
          value={select}
          onChange={(e) => {
            setSelect(e.target.value);
            console.log(select);
          }}
        >
          <option disabled value="">
            Sort
          </option>
          <option value="name">By description</option>
          <option value="description">By name</option>
        </select>
      </div>
      {books.length > 0 && (
        <div>
          <BooksList
            books={filteredAndSortedBooks}
            handleIsOpen={handleIsOpen}
          />
        </div>
      )}
      <Slider
        sliderData={sliderData}
        sliderIndex={sliderIndex}
        handleSlider={handleSlider}
      />
    </main>
  );
}

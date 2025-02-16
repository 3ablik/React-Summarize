import BooksItem from "../books/BooksItem";
const BooksList = ({ books, handleIsOpen }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BooksItem
          key={book.id}
          name={book.name}
          description={book.description}
          releaseDate={book.releaseDate}
          src={book.src}
          author={book.author}
          price={book.price}
          isOpen={book.isOpen}
          handleIsOpen={handleIsOpen}
        />
      ))}
    </div>
  );
};
export default BooksList;

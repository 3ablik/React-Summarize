import { useState } from "react";
import Modal from "../Modal/Modal";

const BooksForm = ({ setBooks }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [src, setSrc] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleReleaseDate = (e) => {
    setReleaseDate(e.target.value);
  };
  const handleSrc = (e) => {
    setSrc(e.target.value);
  };
  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleNewBook = () => {
    setBooks((books) => [
      ...books,
      {
        name,
        description,
        releaseDate,
        src,
        author,
        price,
        isOpen,
        id: books.length,
      },
    ]);
  };

  const handleClearInput = () => {
    setName("");
    setDescription("");
    setReleaseDate("");
    setSrc("");
    setAuthor("");
    setPrice("");
  };

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Add New Book</button>
      <Modal isModal={openModal} onCloseModal={handleCloseModal}>
        <div className="books-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleName}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleDescription}
          />
          <input
            type="text"
            placeholder="Release Date"
            value={releaseDate}
            onChange={handleReleaseDate}
          />
          <input
            type="text"
            placeholder="Source"
            value={src}
            onChange={handleSrc}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={handleAuthor}
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={handlePrice}
          />
          <button
            onClick={() => {
              handleNewBook();
              handleClearInput();
            }}
          >
            Add New Book
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BooksForm;

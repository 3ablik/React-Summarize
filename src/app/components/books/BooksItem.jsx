const BooksItem = ({
  name,
  description,
  releaseDate,
  src,
  author,
  price,
  isOpen,
  handleIsOpen,
  id,
}) => {
  return (
    <div className="book-item" key={id}>
      <img src={src} alt={name} />
      {isOpen ? (
        <h2 style={{ fontSize: "15px" }}>{name}</h2>
      ) : (
        <h2 style={{ fontSize: "20px" }}>{name}</h2>
      )}
      <div>
        <div
          onClick={() => {
            handleIsOpen(name);
          }}
        >
          {isOpen ? (
            <div>
              <p style={{ fontSize: "12px" }}>{description}</p>
              <p style={{ fontSize: "12px" }}>{author}</p>
              <p style={{ fontSize: "12px" }}>{releaseDate}</p>
              <p style={{ fontSize: "20px" }}> {price} </p>
            </div>
          ) : (
            <button
              style={{
                border: "gray solid 2px",
                borderRadius: "8px",
                backgroundColor: "white",
              }}
            >
              Get Detail
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default BooksItem;

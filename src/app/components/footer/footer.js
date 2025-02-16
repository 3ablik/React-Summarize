import img from "../images/logo.png";

export default function Footer() {
  return (
    <footer>
      <img src={img.src} alt="Logo" />
      <p>
        Git:{" "}
        <a
          href="https://github.com/3ablik"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/3ablik
        </a>
      </p>
    </footer>
  );
}

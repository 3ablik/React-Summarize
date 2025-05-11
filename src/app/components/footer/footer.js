import img from "../images/logo.png";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <img src={img.src} alt="logo" />
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

import React from "react";
import "./Footer.css";

export default function Footer() {
  const handleClick = (msg) => {
    alert(msg);
  };

  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Task Manager • Hecho por Sebas</p>
      <nav className="footer-links">
        <button className="linklike" onClick={() => handleClick("Contacto pronto 🙂")}>
          Contacto
        </button>
        <button className="linklike" onClick={() => handleClick("Términos y condiciones")}>
          Términos
        </button>
        <button className="linklike" onClick={() => handleClick("Política de privacidad")}>
          Privacidad
        </button>
      </nav>
    </footer>
  );
}


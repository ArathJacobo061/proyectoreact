export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <p className="copy">
          © {new Date().getFullYear()} · Desarrollado por Arath Sebastián Jacobo Durán
        </p>
        <div className="links">
          <a href="#">Contacto</a>
          <a href="#">Política de privacidad</a>
          <a href="#">Términos de uso</a>
        </div>
      </div>
    </footer>
  );
}

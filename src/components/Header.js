function Header() {
  return (
    <header className="navbar">
      <div className="container">
        <span className="brand">Task Manager</span>

        <div className="actions">
          <button className="btn inicio">Iniciar sesión</button>
          <button className="btn registro">Regístrate</button>
        </div>
      </div>
    </header>
  );
}
export default Header;
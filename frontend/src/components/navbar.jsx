import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/evento">El Evento</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/compras">Comprar Tickets</Link>
      </nav>
    </header>
    
  );
}

export default Navbar;

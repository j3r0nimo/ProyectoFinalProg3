import "../app.css";

function Evento() {
  return (
    <main>
        <h1>Sobre la banda y el evento</h1>
        <p>
          Los Piojos vuelven con todo para reencontrarse con su público en un show histórico en el Estadio River Plate.
        </p>
        <p>Ubicación: Estadio Monumental, Buenos Aires.</p>

        <div className="imagenes">
          <img src="img/acceso.jpg" alt="Accesos al estadio" style={{ marginRight: 20 }} />
          <img src="img/escenario.jpg" alt="Mapa de ubicaciones" style={{ marginRight: 20 }} />
        </div>
    </main>
  );
}

export default Evento;

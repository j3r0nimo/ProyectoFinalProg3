import { useRef } from "react";
import html2canvas from "html2canvas";
import CodigoBarras from "./codigoBarras";

function TarjetaTicket({ ticket }) {
    const ticketRef = useRef();

    const descargarImagen = async () => {
        const canvas = await html2canvas(ticketRef.current);
        const dataURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `ticket-${ticket.id}.png`;
        link.click();
    };

    return (
        <div className="tarjeta-ticket">
            <div ref={ticketRef}>
                <CodigoBarras valor={ticket.id} />
                <hr />
                <h3>Los Piojos</h3>
                <hr />
                <p>ESTADIO RIVER PLATE</p>
                <p>Precio: ${ticket.precio}</p>
                <p>Sector: {ticket.sector}</p>
            </div>

            {/* Botón para descargar */}
            <button onClick={descargarImagen}>Guardar como imagen</button>
        </div>
    );
}

export default TarjetaTicket;
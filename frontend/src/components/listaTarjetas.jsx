import TarjetaTicket from "./tarjetaTicket";

function ListaTarjetas({ tickets }) {
    return (
        <div className="listaTarjeta">
            {tickets.map((t) => (
                <TarjetaTicket key={t.id} ticket={t} />
            ))}
        </div>
    );
}

export default ListaTarjetas;

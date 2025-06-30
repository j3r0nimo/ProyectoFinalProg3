import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ListaTarjetas from "../components/listaTarjetas";

function Tickets() {
    const [usuario, setUsuario] = useState(null)
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const datosGuardados = localStorage.getItem("usuario")
        if (datosGuardados) {
            setUsuario(JSON.parse(datosGuardados))
        }
    }, [])

    useEffect(() => {
        if (!usuario) {
            return;
        }
        const tomarTickets = async () => {
            try {
                const datosTickets = await axios.get(`http://localhost:3001/clientes/${usuario.id}/tickets`)
                setTickets(datosTickets.data)
            }
            catch (error) {
                console.log(error)
            }

        };
        tomarTickets()
    }, [usuario])


    if (!usuario) {
        return <h1>no se cargo el usuario</h1>
    }
    const volver = () => {
        navigate(`/perfil`);

    }
    return (
        <main>
            <h2>TUS TICKETS:</h2>
            <button onClick={volver}>Volver</button>
            {tickets.length === 0 ? (
                <p>no tenes tickets comprados</p>
            ) : (
                <ListaTarjetas tickets={tickets} />
            )
            }
        </main>
    )
}

export default Tickets;
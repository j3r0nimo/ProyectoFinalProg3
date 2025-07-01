import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Perfil(){
    const [usuario, setUsuario] = useState(null)
    const navigate = useNavigate();

    useEffect(() =>{
        const datosGuardados = localStorage.getItem("usuario")
        if (datosGuardados){
            setUsuario(JSON.parse(datosGuardados))
        }
    }, [])

    const borrar=async ()=>{
        if (!usuario){
            return;
        }
        const confirmar = confirm("¿Seguro que quieres borrar la cuenta?")
        if (!confirmar){
            return;
        }
        try{
            await axios.delete(`http://localhost:3001/clientes/${usuario.id}`);
            localStorage.removeItem('usuario')
            navigate('/')
        }
        catch(e){
            console.error("error al borrar cuenta", e);
        }
    }
    if (!usuario){
        return <h1>no se cargo el usuario</h1>
    }
    
    const actualizar = async ()=>{
        const informacion = await axios.get(`http://localhost:3001/clientes/dni/${usuario.dni}`);
        const data = informacion.data;

        localStorage.setItem("usuario", JSON.stringify(data))

        navigate('/actualizar')
    }

    const tickets = async ()=>{
        const informacion = await axios.get(`http://localhost:3001/clientes/dni/${usuario.dni}`);
        const data = informacion.data;

        localStorage.setItem("usuario", JSON.stringify(data))

        navigate('/tickets')
    }
    const comprar = async ()=>{
        const informacion = await axios.get(`http://localhost:3001/clientes/dni/${usuario.dni}`);
        const data = informacion.data;

        localStorage.setItem("usuario", JSON.stringify(data))

        navigate('/comprar')
    }

    return(
        <main>
            <div className="perfil">
                <h2>BIENVENIDO {usuario.nombre}</h2>
                <p>DNI: {usuario.dni}</p>
                <p>Nro. Tarjeta: {usuario.tarjetaNro}</p>
                <p>Fecha Tarjeta: {usuario.tarjetaMA}</p>
                <p>Codigo postal: {usuario.codigoPostal}</p>
                
            </div>
            <div>
                <button onClick={borrar}>Borrar cuenta</button>
                <button onClick={tickets}>Ver compras</button>
            </div>
            <div>
                <button onClick={actualizar}>Actualizar cuenta</button>
                <button onClick={comprar}>Comprar tickets</button>
            </div>
            
        </main>
    )
}

export default Perfil;
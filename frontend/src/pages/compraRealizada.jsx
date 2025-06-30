import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function CompraRealizada(){
    const [usuario, setUsuario] = useState(null)
    const [compra, setCompra] = useState(null)
    const navigate = useNavigate()

    useEffect(() =>{
              const datosUsuario = localStorage.getItem("usuario")
              if (datosUsuario){
                  setUsuario(JSON.parse(datosUsuario))
              }
              const datosCompra = localStorage.getItem("compra")
              if (datosCompra){
                  setCompra(JSON.parse(datosCompra))
                  localStorage.removeItem("compra")
              }
          }, [])

    const volver= ()=>{
        navigate(`/perfil`);
  }
  if (!compra) {
    return <p>Cargando datos de la compra...</p>;
  }
    return(
        <main>
            <h2>COMPRA REALIZADA</h2>
            <div className="contenedor-compra">
                <h3>ID de compra: {compra.compra.id}</h3>
                <h3>Sector: {compra.sector}</h3>
                <h3>Cantidad: {compra.ticketsComprados}</h3>
                <h3>Total pagado: ${compra.total}</h3>
            </div>
            
            <button onClick={volver}>volver</button>
        </main>
    )
}

export default CompraRealizada
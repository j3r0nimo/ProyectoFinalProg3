import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Comprar(){
  const [cantidad, setCantidad] = useState('')
  const [sector, setSector] = useState('');
  const [usuario, setUsuario] = useState(null)
  const [errores, setErrores] = useState({})
  const [cvv, setCvv] = useState('')
  const SECTORES_CON_PRECIOS = {
  "Platea Preferencial": 25000,
  "Platea Alta": 17500,
  "Platea Sivori Media": 17500,
  "Platea Sivori Alta": 9500,
  "Campo Delantero": 22500,
  "Campo General": 15000
};
  
  const navigate = useNavigate();

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!cantidad || cantidad<=0 || isNaN(cantidad)) nuevosErrores.cantidad = "tiene que ser un numero mayor a 0";
    if (!sector) nuevosErrores.sector = "elija sector";
    if (!cvv.match(/^\d{3}$/)) {
      nuevosErrores.cvv = "CVV inválido (3 dígitos)";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  useEffect(() =>{
          const datosGuardados = localStorage.getItem("usuario")
          if (datosGuardados){
              setUsuario(JSON.parse(datosGuardados))
          }
      }, [])
  
  const calcularPrecio = () => {
    const precioUnitario = SECTORES_CON_PRECIOS[sector];
    return cantidad ? precioUnitario * parseInt(cantidad) : 0;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    try {
      const respuesta = await axios.post(`http://localhost:3001/compras`,
        {clienteId: usuario.id, cantidad, sector}
      );

      if (respuesta.status === 200 || respuesta.status===201) {
        
        const informacion = await axios.get(`http://localhost:3001/clientes/dni/${usuario.dni}`);
        localStorage.setItem("compra", JSON.stringify(respuesta.data))
        localStorage.setItem("usuario", JSON.stringify(informacion.data))

        navigate(`/compraRealizada`);

      }
    } catch (error) {
      console.error('error al realizar compra:', error);
      alert("error al realizar compra")
    }
  };
  const volver= ()=>{
        navigate(`/perfil`);
  }
          


  return (
    <main>
        <h3>COMPRA DE TICKET PARA EL RECITAL DE LOS PIOJOS</h3>
      <form>
        <label>Cantidad:</label>
        <input type="text" value={cantidad} onChange={(e) => setCantidad(e.target.value)} /> <br />
        {errores.cantidad && <div style={{ color: 'red' }}>{errores.cantidad}</div>} <br />

        <label>Sector:</label>
        <select value={sector} onChange={(e) => setSector(e.target.value)}>
          <option value="">Seleccione un sector</option>
          <option value="Platea Preferencial">Platea Preferencial</option>  
          <option value="Platea Alta">Platea Alta</option>
          <option value="Platea Sivori Media">Platea Sivori Media</option>
          <option value="Platea Sivori Alta">Platea Sivori Alta</option>
          <option value="Campo Delantero">Campo Delantero</option>
          <option value="Campo General">Campo General</option>
        </select><br />
        {errores.sector && <div style={{ color: 'red' }}>{errores.sector}</div>} <br />

        <label>CVV:</label>
        <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)}/><br />
        {errores.cvv && <div style={{ color: 'red' }}>{errores.cvv}</div>} <br />

        <label>Precio a pagar:</label>
        <input type="text" value={calcularPrecio()}readOnly /><br />
      </form>
      <button onClick={volver}>Volver</button>
      <button onClick={handleSubmit}>Comprar</button>
    
    
    </main>
    
  );
}
export default Comprar;
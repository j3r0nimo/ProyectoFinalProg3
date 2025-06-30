import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Registrar(){
  const [nombre, setnombre] = useState('')
  const [dni, setDni] = useState('');
  const [tarjetaNro, setTarjetaNro] = useState('')
  const [tarjetaMA, setTarjetaMA] = useState('')
  const [codigoPostal, setCodigoPostal] = useState('')
  const [errores, setErrores] = useState({})
  
  const navigate = useNavigate();

  const validarFormulario = async() => {
    const nuevosErrores = {};
    try {
    const respuesta = await axios.get(`http://localhost:3001/clientes/dni/${dni}`);
    if (respuesta.data) {
      nuevosErrores.dni = "DNI ya existe";
    }
  } catch (err) {
    if (err.response?.status !== 404) {
      nuevosErrores.dni = "Error al verificar DNI";
    }
  }

    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!dni.match(/^\d{7,8}$/)) nuevosErrores.dni = "DNI inválido (7 u 8 dígitos)";
    if (!tarjetaNro.match(/^\d{16}$/)) nuevosErrores.tarjetaNro = "Número de tarjeta inválido (16 dígitos)";
    if (!tarjetaMA.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) nuevosErrores.tarjetaMA = "Fecha inválida (MM/AA)";
    if (!codigoPostal.match(/^\d{4,5}$/)) nuevosErrores.codigoPostal = "Código postal inválido";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const esValido = await validarFormulario();
    if (!esValido) return;

    try {
      const respuesta = await axios.post('http://localhost:3001/clientes/',
        {nombre,dni,tarjetaNro,tarjetaMA,codigoPostal}
      );

      if (respuesta.status === 200 || respuesta.status===201) {
        
        const informacion = await axios.get(`http://localhost:3001/clientes/dni/${dni}`);
        const data = informacion.data;

        localStorage.setItem("usuario", JSON.stringify(data))

        navigate(`/perfil`);

      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert("error al crear usuario")
    }
  };

  return (
    <main>
        <h3>REGISTRE SU USUARIO</h3>
    <form>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setnombre(e.target.value)} /> <br />
        {errores.nombre && <div style={{ color: 'red' }}>{errores.nombre}</div>} <br />

        <label>DNI:</label>
        <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} /><br />
        {errores.dni && <div style={{ color: 'red' }}>{errores.dni}</div>} <br />

        <label>Numero de tarjeta:</label>
        <input type="text" value={tarjetaNro} onChange={(e) => setTarjetaNro(e.target.value)} /><br />
        {errores.tarjetaNro && <div style={{ color: 'red' }}>{errores.tarjetaNro}</div>} <br />

        <label>Fecha de tarjeta:</label>
        <input type="text" value={tarjetaMA} onChange={(e) => setTarjetaMA(e.target.value)} /><br />
        {errores.tarjetaMA && <div style={{ color: 'red' }}>{errores.tarjetaMA}</div>} <br />

        <label>Codigo postal:</label>
        <input type="text" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} /><br />
        {errores.codigoPostal && <div style={{ color: 'red' }}>{errores.codigoPostal}</div>} <br />

      
    </form>
    <button type="submit" onClick={handleSubmit}>Crear usuario</button>
    </main>
    
  );
}
export default Registrar;
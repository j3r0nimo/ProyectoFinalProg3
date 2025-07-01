import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Compra() {
  const [dni, setdni] = useState('');
  const navigate = useNavigate();
  const [errores, setErrores] = useState({})

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!dni.match(/^\d{7,8}$/)) nuevosErrores.dni = "DNI inválido (7 u 8 dígitos)";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      const respuesta = await axios.get(`http://localhost:3001/clientes/dni/${dni}`);

      if (respuesta.status === 200) {
        const data = respuesta.data;

        localStorage.setItem("usuario", JSON.stringify(data))

        navigate(`/perfil`);

      }
    } catch (error) {
      if (error.response?.status === 404) {
        setErrores({ dni: "DNI no encontrado. Regístrese." });
      } else {
        console.log("Hubo un problema al buscar el usuario.");
      }
    }
  };

  return (
    <main>
      <form>
        <label>Ingrese su DNI:</label><br />
        <input type="text" value={dni} onChange={(e) => setdni(e.target.value)} />


        <button type="submit" onClick={handleSubmit}>Buscar</button><br />
        {errores.dni && <div style={{ color: 'red' }}>{errores.dni}</div>}
        <a href='/registrar'><b>si no tiene una cuenta haga click aca</b></a>
      </form>
    </main>

  );
}

export default Compra;

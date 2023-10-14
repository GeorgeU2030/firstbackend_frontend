import React, { useEffect, useState } from 'react';
import { obtenerTareaConDescripcionMasLarga } from '../api/task.api';

function ConsultaIns() {
    const [tareaMasLarga, setTareaMasLarga] = useState(null);

    const actualizarTareaMasLarga = () => {
        obtenerTareaConDescripcionMasLarga()
            .then((response) => {
                if (response.status === 200) {
                    setTareaMasLarga(response.data);
                } else {
                    console.error("Error en la respuesta:", response.status);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Este efecto se ejecutará cuando el componente se monte
    useEffect(() => {
        actualizarTareaMasLarga(); // Llama a la función una vez cuando el componente se monta
    }, []);
    const divStyle = {
        backgroundColor: 'red'
      };
    return (
        <div>
            {tareaMasLarga ? (
                <div style={divStyle}>
                    <h2>Tarea con la descripción más larga:</h2>
                    <p>Nombre: {tareaMasLarga.title}</p>
                    <p>Descripción: {tareaMasLarga.description}</p>
                </div>
            ) : (
                <p>No se encontraron tareas con descripciones.</p>
            )}
        </div>
    );
}

export default ConsultaIns;


import React, { useState } from 'react';
import { obtenerTareaConDescripcionMasLarga } from '../api/task.api';

function Consulta() {
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

    return (
        <div>
            {tareaMasLarga ? (
                <div>
                    <h2>Tarea con la descripción más larga:</h2>
                    <p>Nombre: {tareaMasLarga.title}</p>
                    <p>Descripción: {tareaMasLarga.description}</p>
                </div>
            ) : (
                <p>No se encontraron tareas con descripciones.</p>
            )}

            <button onClick={actualizarTareaMasLarga}>Actualizar Tarea Más Larga</button>
        </div>
    );
}

export default Consulta;



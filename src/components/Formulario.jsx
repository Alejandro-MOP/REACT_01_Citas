import React, { Fragment, useState } from "react";
import uuid from 'uuid/dist/v4' ;
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crear State de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //State para validación de formulario vacio
    const [error, actualizarError] = useState(false);

    //Funcion que se ejecuta cada que se escribe en el input
    const actualizarState = e => {
        actualizarCita({
            ...cita,//creamos la copia del objeto
            [e.target.name]: e.target.value//[evento.etiqueta.nombre]:evento.etiqueta.valor
        })
    }    

    //Extraer valores
    //Generamos destructuring para eficiencia y pasar los valores a los inputs
    const {mascota, propietario, fecha, hora, sintomas} = cita;
    
    //Cuando usuario agregue la cita
    const submitCita = e => {
        e.preventDefault();//evita la accion por default en la url "../?mascota=&propietario=&fecha=&hora=&sintomas="
        
      //Validar inputs no vacios
      if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
          actualizarError(true);
          return;//salir de la funcion y mostrar mensaje de validacion
      }

      //Eliminar mensaje de error
      actualizarError(false);

      //Asignar id
      cita.id = uuid();//|npm i uuid| intala este paquete de id's
      
      //Crear la cita
      crearCita(cita);

      //Reiniciar el Form
      actualizarCita({
          mascota: '',
          propietario: '',
          fecha: '',
          hora: '',
          sintomas: ''
      });

    }
    

  return (
    <Fragment>
      <h2>Crear Cita</h2>

        { 
          (error)
            ? <p className="alerta-error">Todos los campos son obligatorios</p>
            : null
        }

      <form
        onSubmit={submitCita}
      >
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre del Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input 
            type="date" 
            name="fecha" 
            className="u-full-width"
            onChange={actualizarState} 
            value={fecha}
        />

        <label>Hora</label>
            <input 
                type="time" 
                name="hora" 
                className="u-full-width"
                onChange={actualizarState} 
                value={hora}
            />

        <label>Sintomas</label>
        <textarea 
            className="u-full-width" 
            name="sintomas"
            onChange={actualizarState}
            value={sintomas}
        ></textarea>

        <button
            type="submit"
            className="u-full-width button-primary"
        >Agregar Cita</button>

      </form>

    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}


export default Formulario;

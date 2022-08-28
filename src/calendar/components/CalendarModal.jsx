import { useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { useUiStore } from "../../hooks";

registerLocale('es', es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root"); //Ayuda a sobreponer ante todo

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal }= useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "Alexis",
    notes: "Petrovich",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  // valor que se memoriza si el titulo o el formSubmitted cambian
    const titleClass = useMemo(() =>{
        if( !formSubmitted) return '';

        return formValues.title.length > 0 ? '' : 'is-invalid';

    }, [formValues.title, formSubmitted])

  const onInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }
  
  //changing es el start o end
  const onDateChange = (event, changing) => { 
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  }

  const onCloseModal = () => {
    //cerrar modal
    closeDateModal();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    //la diferencia no debe ser negativa o si es NaN
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if( isNaN( difference) || difference < 0){
        Swal.fire('Fechas incorrectas','Revisar las fechas ingresadas','error');
        return;
    }

    if(formValues.title.length <= 0) return;

    console.log(formValues);

    //TODO
    // cerrar modal
    // remover error en pantalla

  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ onCloseModal }
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={ onSubmit }>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker 
            selected={formValues.start}
            onChange={ (event) => onDateChange(event, "start") }
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker 
            minDate={ formValues.start }
            selected={formValues.end}
            onChange={ (event) => onDateChange(event, "end") }
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${ titleClass }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

const moment = require('moment');

//funcion que valida si una cadena es una fecha
const isDate = ( value ) =>{

    if( !value ){
        return false;
    }

    const date = moment( value ); //moment me indica si la fecha es correcta
    if( date.isValid() ){
        return true;
    }else{
        return false;
    }
    

}

module.exports = {
    isDate
}
import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

// Todo: configurar interceptores

calendarApi.interceptors.request.use((config) => {
    //cualquier peticion que haga con calendarApi, adicionalmente agrege éste header
    //si no hay token devuelve undefined y falta de autorizacion
    config.headers ={
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default calendarApi;
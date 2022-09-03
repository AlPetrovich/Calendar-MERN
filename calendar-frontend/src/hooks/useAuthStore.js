import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { onLogoutCalendar } from "../store";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore= () =>{

    
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    // *LOGIN CONECTADO A BACKEND
    const startLogin = async({ email, password }) =>{
        dispatch( onChecking() );
        //llegar al backend
        try {
            const { data } = await calendarApi.post('/auth',{ email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid}) );            

        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    //* REGISTER  /api/auth/new
    const startRegister = async({ email, password, name }) =>{
        dispatch( onChecking() );
        try {
            const { data } = await calendarApi.post('/auth/new', {email, password, name});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid}) ); 
        } catch (error) {
            dispatch( onLogout(error.response.data?.msg || '--' ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    //* REVALIDAR TOKEN
    const checkAuthToken = async() =>{
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout() );

        try {
            
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid}) ); 

        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    //* LOGOUT
    const startLogout = () =>{
        localStorage.clear();
        dispatch( onLogoutCalendar() )
        dispatch( onLogout() );
    }

    return{
        //*Propiedades
        errorMessage,
        status,
        user,
        //*Métodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout
    }
}
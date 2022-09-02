import { useEffect } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { getEnvVariables } from "../helpers"
import { useAuthStore } from "../hooks"


export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken(); 
  }, [])

  if( status === 'checking' ){
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
        {
            (status === 'not-authenticated')
             ? (
                <>
                {/* Unica ruta que me deja visitar si no estoy autenticado */}
                  <Route path="/auth/*" element={<LoginPage /> } />
                  <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
             )
             : (
                <>
                  <Route path="/" element={<CalendarPage /> } />
                  {/* cualquier ruta me va a dirigir al calendarPage una vez dentro */}
                  <Route path="/*" element={<Navigate to="/" />} />
                </>
             )
        }
        
        
    </Routes>
  )

}
